using ERP.User.Application.Repositories.Interfaces;
using ERP.User.Domain.Models;
using ERP.User.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ERP.User.Infrastructure
{
    public class MenuMasterRepository : IMenuMasterRepository
    {
        private readonly ApplicationDbContext _context;
        public MenuMasterRepository(ApplicationDbContext context)
        {
            _context = context; 
        }
        public async Task<List<MenuMaster>> GetModulesList()
        {
            return await _context.MenuMasters.ToListAsync();
        }
    }
}
