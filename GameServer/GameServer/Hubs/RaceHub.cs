using System.Text.RegularExpressions;
using GameServer.Models;
using GameServer.Services;
using Microsoft.AspNetCore.SignalR;

namespace GameServer.Hubs;

public class RaceHub : Hub
{
    private readonly RoomService _roomService;
    private readonly Dictionary<string, (string RoomCode, string UserId)> _connections = new();

    public RaceHub(RoomService roomService)
    {
        _roomService = roomService;
    }

    public async Task JoinRoom(string code, string userId)
    {
        var player = new PlayerSession
        {
            UserId = userId,
            ConnectionId = Context.ConnectionId,
            IsReady = false
        };

        var added = _roomService.AddPlayer(code, player);

        if (!added) throw new HubException("Unable to join room.");

        await Groups.AddToGroupAsync(Context.ConnectionId, code);

        _connections[Context.ConnectionId] = (code, userId);

        await Clients.Group(code).SendAsync("PlayerJoined", new{userId = userId});
    }

    public async Task SetReady(bool isReady)
    {
        if (!_connections.TryGetValue(Context.ConnectionId, out var connection))
        {
            throw new HubException("You are not in a room.");
        }

        _roomService.SetReady(connection.RoomCode, connection.UserId, isReady);

        await Clients.Group(connection.RoomCode).SendAsync("PlayerReadyChanged", new
        {
            UserId = connection.UserId,
            IsReady = isReady
        });
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        if(_connections.TryGetValue(Context.ConnectionId, out var connection))
        {
            _roomService.RemovePlayer(connection.RoomCode, connection.UserId);
            _connections.Remove(Context.ConnectionId);

            await Clients.Group(connection.RoomCode).SendAsync("PlayerLet", new
            {
                userId = connection.UserId
            });
        }
        await base.OnDisconnectedAsync(exception);
    }
}