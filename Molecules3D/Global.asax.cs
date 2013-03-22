using System;
using System.Web.Http;

namespace Molecules3D
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            GlobalConfiguration.Configuration.Routes.MapHttpRoute(
                name: "API Search",
                routeTemplate: "api/search/{searchTerm}",
				defaults: new { controller = "Search", searchTerm = RouteParameter.Optional });
        }
    }
}