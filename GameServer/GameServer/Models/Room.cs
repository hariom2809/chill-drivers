using GameServer.Models;

namespace GameServer.Models
{
    public enum RaceState
    {
        Waiting,
        Racing,
        Finished,
    }

    public class Room
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public string HostUserId { get; set; }
        public List<PlayerSession> Players { get; set; } = new();
        public RaceState State { get; set; }
        public int MaxPlayers { get; set; } = 4;
        
    }
}
