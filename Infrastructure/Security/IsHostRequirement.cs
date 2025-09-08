using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class IsHostRequirement : IAuthorizationRequirement
{
}
public class IsHostRequirementHandler(AppDbContext bdContext, IHttpContextAccessor httpContextAccessor): AuthorizationHandler<IsHostRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return;

        var httpContext = httpContextAccessor.HttpContext;

        if (httpContext?.GetRouteValue("id") is not string activityId) return;

        // It's said in the course that the AsNoTracking is nescessary because the aspNet will keep track of the attendee from the contoller
        // And therefore will get rid of the attendees i wasn't able to reproduce the bug but i belive is a good practice and to have it.  
        var attendee = await bdContext.ActivityAttendees.AsNoTracking().SingleOrDefaultAsync(x => x.UserId == userId && x.ActivityId == activityId);

        if (attendee == null) return;

        if (attendee.IsHost) context.Succeed(requirement);

    }
}


