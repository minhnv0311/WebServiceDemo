using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApiCore.Models;

namespace WebApiCore.Controllers
{
    public class BaseController : ApiController
    {
        protected WebApiDataEntities db = new WebApiDataEntities();

        public class Paging<T>
        {
            public T data { get; set; }
            public int totalCount { get; set; }
            public int pageStart { get; set; }
            public int pageEnd { get; set; }
            public int totalPage { get; set; }
        }
    }
}
