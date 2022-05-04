using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(WebApiCore.Startup))]

namespace WebApiCore
{

    public partial class Startup
    {
        public void Configuration(IAppBuilder app )
        {
            ConfigureAuth(app);
        }

    }
}
