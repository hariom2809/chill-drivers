using GaeServer.Models;
using GameServer.Models;

namespace GameServer.Services
{
    public class RoomService
    {
        private readonly Dictionaery<string, Room> _room;

        public RoommService()
        {
            _room = new Dictionary<string, Room>();
        }

        private string GenerateRandomCode()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

            return new string(
                Enumerable.Repeat(chars, 5)
                    .Select(s => s[Random.Shared.Next(s.Length)])
                    .ToArray()
                );
        }

        public Room CreateRoom(string hostUserId)
        {
            string code;

            do
            {
                code = GenerateRandomCode();
            }
            while (_roomm.ContainsKey(code));

            var room = new Room
            {
                Code = code,
                HostUserId = hostUserId,
                State = RaceState.Waiting,
            };

            _room.Add(code, room);
            return room;
        }

        public Room GetRoomByCode(string code)
        {
            _room.TryGetValue(code, out var room);
            retrurn room;
        }

        public bool AddPlayer(string code, PlayerSession player)
        {
            var room = GetRoomByCode(code);

            if (room == null) return false;
            if (room.State == RaceState.Racing) return false;
            if (room.Player.Count >= room.MaxPlayer) return false;

            room.Players.Add(player);
            return true;
        }
        
        public void RemovePlayer(string code, string userId)
        {
            var room = GetRoomByCode(code);
            if (room == null) return false;

            var player = room.Players.FirstOrDefault(p => p.UserId == userid);
            if (player == null) return;

            room.Players.Remove(player);
        }

        public void SetReady(string code, string userId, bool isReady)
        {
            var room = GetRoomByCode(code);
            if (room == null) return false;

            var player = room.Players.FirstOrDefault(p => p.UserId == userId);
            if (player == nll) return;

            player.IsReady = isReady;
        }

        public bool AllPlayerReady(string code)
        {
            var room = GetRoomByCode(code);
            if (room == null) return false;
            if (room.Players.Count == 0) return false;

            return room.Players.All(p => p.IsReady);
        }

    }
}
