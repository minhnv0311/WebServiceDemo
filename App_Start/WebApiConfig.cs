using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Stimulsoft.Base.Json.Converters;

namespace WebApiCore
{
    public static class WebApiConfig
    {
        //public static void Register(HttpConfiguration config)
        //{
        //    config.Routes.MapHttpRoute(
        //            name: "Index",
        //            routeTemplate: "{id}.html",
        //            defaults: new { id = "index" }
        //    );

        //    config.Routes.MapHttpRoute(
        //        name: "DefaultApi",
        //        routeTemplate: "api/{controller}/{id}",
        //        defaults: new { id = RouteParameter.Optional }
        //    );
        //    config.Formatters.JsonFormatter.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.IsoDateTimeConverter() { Culture = new CultureInfo("en-GB") });
        //}
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            //
            // config.Formatters.JsonFormatter.SerializerSettings.Converters.Add(new MyDateTimeConvertor());
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();
            // Route to index.html
            config.Routes.MapHttpRoute(
                name: "Index",
                routeTemplate: "{id}.html",
                defaults: new { id = "home" });
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.Formatters.JsonFormatter.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.IsoDateTimeConverter() { Culture = new CultureInfo("en-GB") });
        }
    }
}
