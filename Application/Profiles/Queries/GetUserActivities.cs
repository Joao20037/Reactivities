using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Persistence;

namespace Application.Profiles.Queries;

public class GetUserActivities
{
    public class Query : IRequest<Result<List<UserActivityDto>>>
    {
        public required string UserId { get; set; }
        public required UserActivitiesParams Params { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<UserActivityDto>>>
    {
        public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.Activities
                .OrderBy(x => x.Date)
                .AsQueryable();

            // Filters
            if (!string.IsNullOrEmpty(request.Params.Filter))
            {
                query = request.Params.Filter switch
                {
                    "hosting" => query.Where(x => x.Attendees.Any(a => a.IsHost && a.UserId == request.UserId)),
                    "past" => query.Where(x => x.Date <= DateTime.UtcNow && x.Attendees.Any(a => a.UserId == request.UserId)),
                    "future" => query.Where(x => x.Date >= DateTime.UtcNow && x.Attendees.Any(a => a.UserId == request.UserId)),
                    _ => query.Where(x => x.Attendees.Any(a => a.UserId == request.UserId))
                };
            }

            var projectedActivities = query.ProjectTo<UserActivityDto>(mapper.ConfigurationProvider, new { currentUserId = request.UserId });

            var activities = await projectedActivities.ToListAsync(cancellationToken);

            return Result<List<UserActivityDto>>.Success(activities);
            
        }
    }


}
