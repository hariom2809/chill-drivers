namespace GameServer.Models
{
    public class PlayerSession
    {
        public string UserId { get; set; }
        public string ConnectionId { get; set; }
        public bool IsReady { get; set; }
    }
}