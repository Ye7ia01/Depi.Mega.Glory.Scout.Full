﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GloryScout.Data
{
	public class Scout
	{
		public Scout()
		{
		}
		public Guid Id { get; set; }
		public string? Specialization { get; set; }
		public int? Experience { get; set; }
		public string? CurrentClubName { get; set; }
		public string? CoachingSpecialty { get; set; }
		public Guid UserId { get; set; }

		// Navigation properties
		[ForeignKey("UserId")] public virtual User User { get; set; } 
	}
}
