using GameServer.Models;

namespace GameServer.Services
{
    public class RoomService
    {
        private readonly Dictionary<string, Room> _room;

        public RoomService()
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
            while (_room.ContainsKey(code));

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
            return room;
        }

        public bool AddPlayer(string code, PlayerSession player)
        {
            var room = GetRoomByCode(code);

            if (room == null) return false;
            if (room.State == RaceState.Racing) return false;
            if (room.Players.Count >= room.MaxPlayers) return false;

            room.Players.Add(player);
            return true;
        }
        
        public void RemovePlayer(string code, string userId)
        {
            var room = GetRoomByCode(code);
            if (room == null) return;

            var player = room.Players.FirstOrDefault(p => p.UserId == userId);
            if (player == null) return;

            room.Players.Remove(player);
        }

        public void SetReady(string code, string userId, bool isReady)
        {
            var room = GetRoomByCode(code);
            if (room == null) return;

            var player = room.Players.FirstOrDefault(p => p.UserId == userId);
            if (player == null) return;

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
