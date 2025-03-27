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

        //[HttpGet("SortTitle")]
        //public IActionResult GetSortedBooks(int pageSize = 5, int pageNum = 1)
        //{
        //    string? favCategory = Request.Cookies["FavoriteCategory"];
        //    Console.WriteLine("--------COOKIE---------\n" + favCategory);

        //    HttpContext.Response.Cookies.Append("FavoriteCategory", "Classic", new CookieOptions
        //    {
        //        HttpOnly = true,
        //        Secure = true,
        //        SameSite = SameSiteMode.Strict,
        //        Expires = DateTime.Now.AddMinutes(5),
        //    });

        //    var bookList = _bookContext.Books
        //    .OrderBy(b => b.Title)
        //    .Skip((pageNum - 1) * pageSize)
        //    .Take(pageSize)
        //    .ToList();

        //    var totalNumBooks = _bookContext.Books.Count();

        //    var passingData = new
        //    {
        //        Books = bookList,
        //        TotalNumBooks = totalNumBooks
        //    };

        //    return Ok(passingData);
        //}

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookCategories = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookCategories);
        }
    }
}
