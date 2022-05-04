using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WebApiCore
{
   
    //public class Response<T> : Response
    //{
    //    public T Data { get; set; }
    //    public int TotalCount { get; set; }
    //    public int DataCount { get; set; }
    //    public Paging paging { get; set; }

    //    public Response(int status, string message = null, T data = default(T))
    //        : base(status, message)
    //    {
    //        Data = data;
    //        TotalCount = 0;
    //        DataCount = 0;
    //    }

    //    public Response(int status,
    //        string message = null,
    //        T data = default(T),
    //        int dataCount = 0,
    //        int totalCount = 0,
    //        Paging paging = null)
    //        : base(status, message)
    //    {
    //        Data = data;
    //        TotalCount = totalCount;
    //        DataCount = dataCount;
    //        this.paging = paging;
    //    }
    //}

    //public class Response
    //{
    //    public int Status { get; set; }
    //    public string Message { get; set; }
    //    public Response(int status, string message = null)
    //    {
    //        Status = status;
    //        Message = message;
    //    }
    //}
}