using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GameServer.Services;

namespace GameServer.Controllers
{
    [Route("rooms")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly RoomService _roomService;

        public RoomController(RoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpPost]
        public ActionResult CreateRoom()
        {
            var hostUserId = "temp-user";
            var room = _roomService.CreateRoom(hostUserId);

            return Ok(new
            {
                code = room.Code
            });
        }

        [HttpGet("{code}")]
        public ActionResult GetRoom(string code)
        {
            var room = _roomService.GetRoomByCode(code);

            if (room == null)
                return NotFound();

            return Ok(new
            {
                code = room.Code,
                state = room.State,
                playerCount = room.Players.Count,
                players = room.Players.Select(p => new
                {
                    userId = p.UserId,
                    isReady = p.IsReady,
                })
            });
        }


    }
}
