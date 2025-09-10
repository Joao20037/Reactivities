using System.Runtime.CompilerServices;
using Application.Profiles.Commands;
using Application.Profiles.DTOs;
using Application.Profiles.Queries;
using Domain;
using Infrastructure.Photos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Differencing;

namespace API.Controllers;

public class ProfilesController : BaseApiController
{
    [HttpPost("add-photo")]
    public async Task<ActionResult<Photo>> AddPhoto([FromForm] IFormFile file)
    {
        return HandleResult(await Mediator.Send(new AddPhoto.Command { File = file }));
    }

    [HttpGet("{userId}/photos")]
    public async Task<ActionResult<List<Photo>>> GetPhotosForUser(string userId)
    {
        return HandleResult(await Mediator.Send(new GetProfilePhotos.Query { UserId = userId }));
    }

    [HttpDelete("{photoId}/photos")]
    public async Task<ActionResult> DeletePhoto(string photoId)
    {
        return HandleResult(await Mediator.Send(new DeletePhoto.Command { PhotoId = photoId }));
    }

    [HttpPut("{photoId}/setMain")]
    public async Task<ActionResult> SetMainPhoto(string photoId)
    {
        return HandleResult(await Mediator.Send(new SetMainPhoto.Command { PhotoId = photoId }));
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<UserProfile>> GetProfile(string userId)
    {
        return HandleResult(await Mediator.Send(new GetProfile.Query { UserId = userId }));
    }

    [HttpPut]
    public async Task<ActionResult<UserProfile>> UpdateProfile(EditProfileDto profile)
    {
        return HandleResult(await Mediator.Send(new EditProfile.Command { ProfileDto = profile }));
    }
}