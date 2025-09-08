using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Activity> Activities { get; set; }
    public DbSet<AcitivityAttendee> ActivityAttendees { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<AcitivityAttendee>(x => x.HasKey(a => new { a.ActivityId, a.UserId }));

        builder.Entity<AcitivityAttendee>()
            .HasOne(x => x.User)
            .WithMany(x => x.Acitivities)
            .HasForeignKey(x => x.UserId);

        builder.Entity<AcitivityAttendee>()
            .HasOne(x => x.Activity)
            .WithMany(x => x.Attendees)
            .HasForeignKey(x => x.ActivityId);
    }
}
