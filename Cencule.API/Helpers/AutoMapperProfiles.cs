using System.Linq;
using AutoMapper;
using Cencule.API.Dtos;
using Cencule.API.Models;

namespace Cencule.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDTO>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age, opt =>
                opt.MapFrom(src => src.DateOfBirth.CalculatingAge()));
            CreateMap<User, UserForDetailedDTO>()
            .ForMember(dest => dest.PhotoUrl, opt =>
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age, opt =>
                opt.MapFrom(src => src.DateOfBirth.CalculatingAge()));
            CreateMap<Photo, PhotosForDetailedDTO>();
            CreateMap<Photo, PhotoForWallDTO>();
            CreateMap<Blog, BlogForWallDTO>();
            CreateMap<Blog, BlogForReturnDto>();
            CreateMap<BlogForUpdateDto, Blog>();
            CreateMap<BlogForCreationDTO, Blog>();
            CreateMap<Statistic, StatisticDTO>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<Lake, LakeForReturnDTO>();
            CreateMap<LakeForCreationDTO, Lake>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<User, UserForBlogDto>();
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>()
                .ForMember(m => m.SenderPhotoUrl, opt =>
                    opt.MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(m => m.RecipientPhotoUrl, opt =>
                    opt.MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));

        }
    }
}