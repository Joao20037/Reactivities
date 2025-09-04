using System;
using Domain;
using MediatR;
using Persistence;
using AutoMapper;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Activity.Id], cancellationToken)
                ?? throw new Exception("Cannot find Activity");

            mapper.Map(request.Activity, activity);
            Console.WriteLine($"Mapped title: {activity.Title}"); // Deve mostrar o novo valor
            
            await context.SaveChangesAsync(cancellationToken);   
        }
    }
}
