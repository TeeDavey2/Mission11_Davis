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
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? categories = null, bool sortByTitle=false)
        {
            var query = _bookContext.Books.AsQueryable();

            //Sorting code
            if (sortByTitle)
            {
                query = query.OrderBy(b => b.Title);
            }

            //Filtering code
            if (categories != null && categories.Any())
            {
                query = query.Where(b => categories.Contains(b.Category));
            }

            //Cookies
            string? favCategory = Request.Cookies["FavoriteCategory"];
            Console.WriteLine("--------COOKIE---------\n" + favCategory);

            HttpContext.Response.Cookies.Append("FavoriteCategory", "Classic", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(5),
            });

            var totalNumBooks = query.Count();

            var bookList = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();


            var passingData = new
            {
                Books = bookList,
                TotalNumBooks = totalNumBooks
            };

            return Ok(passingData);
        }


        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookCategories = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookCategories);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody]Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }
        
        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody]Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookID);

            if (existingBook == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();
            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _bookContext.Books.Find(bookID);

            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();
            return Ok(new { message = "Book deleted successfully" });
        }
    }
}
