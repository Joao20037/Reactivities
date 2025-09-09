using System;
using Application.Interfaces;
using Application.Profiles.DTOs;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos;

public class PhotoService : IPhotoService
{
    private readonly Cloudinary _cloudnary;

    public PhotoService(IOptions<CloudinarySettings> config)
    {
        var account = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );

        _cloudnary = new Cloudinary(account);
    }
    public async Task<string> DeletePhoto(string publicId)
    {
        var deleteParams = new DeletionParams(publicId);

        var result = await _cloudnary.DestroyAsync(deleteParams);

        if (result.Error != null)
        {
            throw new Exception(result.Error.Message);
        }

        return result.Result;
    }

    public async Task<PhotoUploadResult?> UploadResult(IFormFile file)
    {
        if (file.Length > 0)
        {
            await using var stream = file.OpenReadStream();

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                // Transformation = new Transformation().Height(500).Width(500).Crop('fill'),
                Folder = "Reactivities2025"
            };

            var UploadResult = await _cloudnary.UploadAsync(uploadParams);

            if (UploadResult.Error != null)
            {
                throw new Exception(UploadResult.Error.Message);
            }

            return new PhotoUploadResult
            {
                PublicId = UploadResult.PublicId,
                Url = UploadResult.SecureUrl.AbsoluteUri
            };
        }

        return null;
    }
}
