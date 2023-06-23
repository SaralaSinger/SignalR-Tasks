using Microsoft.EntityFrameworkCore;

namespace Tasks.Data
{
    public class TasksRepository
    {
        private readonly string _connectionString;

        public TasksRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        
        public void Add(TaskItem task)
        {
            using var context = new DataContext(_connectionString);
            context.Tasks.Add(task);
            context.SaveChanges();
        }
        public List<TaskItem> GetTasks()
        {
            var context = new DataContext(_connectionString);
            return context.Tasks.Include(t => t.User).ToList();
        }
        public void SetTaskToUser(int taskId, int userId)
        {

            var context = new DataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE Tasks SET userId={userId} WHERE id={taskId}");
        }
        public void Delete(int taskId)
        {
            var context = new DataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Tasks WHERE id={taskId}");
        }
    }
}