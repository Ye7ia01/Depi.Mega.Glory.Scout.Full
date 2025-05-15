﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using GloryScout.Data;
using GloryScout.Domain.Dtos.HomePageDtos;
using GloryScout.Domain.Dtos.IdentityDtos;
using GloryScout.Domain.Dtos.UserProfileDtos;

namespace GloryScout.Domain.Profiles
{
    public class ApplicationProfile:Profile , IMapperProfile
	{
        public ApplicationProfile()
        {
			//mapping Dtops and db models
			// User mappings
			CreateMap<User, UserDto>()
				.ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.UserType));

			CreateMap<UpdateUserDto, User>();

			// Player mappings
			CreateMap<PlayerRegisterDto, User>()
				.ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Username))
				.ForMember(dest => dest.UserType, opt => opt.MapFrom(src => "Player"))
				.ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.Now))
				.ForMember(dest => dest.Id, opt => opt.Ignore())
				.ForMember(dest => dest.Posts, opt => opt.Ignore())
				.ForMember(dest => dest.Comments, opt => opt.Ignore())
				.ForMember(dest => dest.Likes, opt => opt.Ignore())
				.ForMember(dest => dest.VerificationCodes, opt => opt.Ignore())
				.ForMember(dest => dest.Nationality, opt => opt.Ignore())
				.ForMember(dest => dest.IsVerified, opt => opt.Ignore());

			CreateMap<PlayerRegisterDto, Player>()
			   .ForMember(dest => dest.Id, opt => opt.Ignore())
			   .ForMember(dest => dest.User, opt => opt.Ignore())
			   .ForMember(dest => dest.UserId, opt => opt.Ignore())
			   .ForMember(dest => dest.CurrentTeam, opt => opt.Ignore())
			   .ForMember(dest => dest.DominantFoot, opt => opt.Ignore());


			CreateMap<CoachRegisterDto, User>()
			   .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Username))
			   .ForMember(dest => dest.UserType, opt => opt.MapFrom(src => "Scout"))
			   .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.Now))
			   .ForMember(dest => dest.Id, opt => opt.Ignore())
			   .ForMember(dest => dest.Posts, opt => opt.Ignore())
			   .ForMember(dest => dest.Comments, opt => opt.Ignore())
			   .ForMember(dest => dest.Likes, opt => opt.Ignore())
			   .ForMember(dest => dest.VerificationCodes, opt => opt.Ignore())
			   .ForMember(dest => dest.Nationality, opt => opt.Ignore())
			   .ForMember(dest => dest.IsVerified, opt => opt.Ignore());

			CreateMap<CoachRegisterDto, Scout>()
				.ForMember(dest => dest.Id, opt => opt.Ignore())
				.ForMember(dest => dest.User, opt => opt.Ignore())
				.ForMember(dest => dest.UserId, opt => opt.Ignore())
				.ForMember(dest => dest.CurrentClubName, opt => opt.MapFrom(src => src.CurrentClubName));

			// Authentication mappings
			CreateMap<User, AuthDto>()
				.ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.UserName))
				.ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.UserType))
				.ForMember(dest => dest.IsAuthenticated, opt => opt.Ignore())
				.ForMember(dest => dest.Token, opt => opt.Ignore())
				.ForMember(dest => dest.ExpiresOn, opt => opt.Ignore())
				.ForMember(dest => dest.Message, opt => opt.Ignore());

			// Additional DTOs
			CreateMap<LoginDto, User>()
				.ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
				.ForMember(dest => dest.Id, opt => opt.Ignore())
				.ForMember(dest => dest.UserName, opt => opt.Ignore());


			CreateMap<ChangePasswordDto, User>().ReverseMap();
			//	.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));
			////.ForAllOtherMembers(opt => opt.Ignore());

			CreateMap<ResetPasswordDto, User>().ReverseMap();
			//.ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email));
			//.ForAllOtherMembers(opt => opt.Ignore());

			CreateMap<PostDto, Post>()
			// if your DTO has a typo or different name, remap it:
			.ForMember(dest => dest.PosrUrl, opt => opt.MapFrom(src => src.PosrUrl))
			.ReverseMap();

			CreateMap<Post, FeedPostsDto>().ReverseMap();

			CreateMap<HomeUserDto, User>().ReverseMap();
			CreateMap<FeedPostsDto, Post>()
				.ForMember(dest => dest.PosrUrl, opt => opt.MapFrom(src => src.PosrUrl))
				.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
				.ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
				.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.User, opt => opt.Ignore())
				.ForMember(dest => dest.Likes, opt => opt.Ignore())
				.ForMember(dest => dest.Comments, opt => opt.Ignore())
				.ReverseMap();

	
		}

		public void CreateMaps(IMapperConfigurationExpression configuration)
		{
			// This method implements the IMapperProfile interface
			// The mappings are already defined in the constructor, so this can be left empty
			// or you can add additional configuration here if needed
		}
	}
}
