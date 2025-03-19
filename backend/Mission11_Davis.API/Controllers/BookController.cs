using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Davis.API.Data;

namespace Mission11_Davis.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        public BookController(BookDbContext temp) => _bookContext = temp;

        [HttpGet("AllBooks")]
        public IEnumerable<Book> GetBooks()
        {
            var bookList = _bookContext.Books.ToList();
            return bookList;
        }

        [HttpGet("SortTitle")]
        public IEnumerable<Book> GetSortedBooks()
        {
            var bookList = _bookContext.Books.OrderBy(b => b.Title).ToList();
            return bookList;
        }

    }
}
