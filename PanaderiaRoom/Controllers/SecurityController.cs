using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PanaderiaRoom.Controllers {
    public class SecurityController : Controller {
        public IActionResult Index() {
            return View();
        }

        public IActionResult LogOn(string username, string password) {
            return RedirectToAction("Index", "Home");
        }

        public IActionResult SocialLogin(string socialType) {
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name, "Social Login"),
                new Claim(ClaimTypes.Role, "ADM"),
                new Claim(ClaimTypes.Authentication, socialType),
            };

            HttpContext.User.AddIdentity(new GenericIdentity(socialType, "Default"));

            FormsAuthenticationTicket authTicket = new FormsAuthenticationTicket(
                1,
                socialType,
                DateTime.Now,
                DateTime.Now.AddMinutes(15),
                false,
                new {});
            

            if (socialType == "GIM") {

            }

            return RedirectToAction("Index", "Home");
        }

        public IActionResult LogOut() {
            return RedirectToAction("Index", "Security");
        }
    }

    public class FormsAuthenticationTicket
    {
        public FormsAuthenticationTicket(int i, object email, DateTime now, DateTime addMinutes, bool b, object userData)
        {
            throw new NotImplementedException();
        }
    }
}