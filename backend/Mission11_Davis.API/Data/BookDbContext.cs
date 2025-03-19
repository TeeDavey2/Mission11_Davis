﻿using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;

namespace Mission11_Davis.API.Data
{
    public class BookDbContext: DbContext
    {
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
    }


    }
