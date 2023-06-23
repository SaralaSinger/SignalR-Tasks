using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Tasks.Data;
using Tasks.Web.Models;

namespace Tasks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly string _connectionString;
        private readonly IHubContext<TaskHub> _hub;
        public TasksController(IConfiguration configuration, IHubContext<TaskHub> hub)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
            _hub = hub;
        }
        [HttpPost]
        [Route("add")]
        public void Add(TaskItem task)
        {
            var repo = new TasksRepository(_connectionString);
            repo.Add(task);
            _hub.Clients.All.SendAsync("newTask", repo.GetTasks());
        }
        [HttpGet]
        [Route("gettasks")]
        public List<TaskItem> GetTasks()
        {
            var repo = new TasksRepository(_connectionString);
            return repo.GetTasks();
        }
        [HttpPost]
        [Route("settasktouser")]
        public void SetTaskToUser(TaskIdViewModel vm)
        {
            var tasksRepo = new TasksRepository(_connectionString);
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            tasksRepo.SetTaskToUser(vm.TaskId, user.Id);
            _hub.Clients.All.SendAsync("setTaskToPerson", tasksRepo.GetTasks());
        }
        [HttpPost]
        [Route("done")]
        public void Done(TaskIdViewModel vm)
        {
            var tasksRepo = new TasksRepository(_connectionString);
            tasksRepo.Delete(vm.TaskId);
            _hub.Clients.All.SendAsync("done", tasksRepo.GetTasks());
        }
    }
}
