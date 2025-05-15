import {useState} from "react";
import coachIcon from '../../assets/coachIcon.svg'




const getPlayers = () => {
    const players = [
        {
            name: "John Doe",
            image: coachIcon,
            jobPosition: "Software Engineer",
            company: "Tech Corp",
            mobileNumber: "+1234567890",
            email: "john.doe@example.com"
        },
        {
            name: "Jane Smith",
            image: coachIcon,
            jobPosition: "Product Manager",
            company: "Innovate Ltd",
            mobileNumber: "+0987654321",
            email: "jane.smith@example.com"
        },
        {
            name: "Alice Johnson",
            image: coachIcon,
            jobPosition: "UX Designer",
            company: "Creative Solutions",
            mobileNumber: "+1122334455",
            email: "alice.johnson@example.com"
        },
        {
            name: "Bob Brown",
            image: coachIcon,
            jobPosition: "Data Scientist",
            company: "Data Insights",
            mobileNumber: "+2233445566",
            email: "bob.brown@example.com"
        },
        {
            name: "Charlie Davis",
            image: coachIcon,
            jobPosition: "DevOps Engineer",
            company: "Cloud Services",
            mobileNumber: "+3344556677",
            email: "charlie.davis@example.com"
        },
        {
            name: "Diana Evans",
            image: coachIcon,
            jobPosition: "Marketing Specialist",
            company: "Market Leaders",
            mobileNumber: "+4455667788",
            email: "diana.evans@example.com"
        },
        {
            name: "Ethan Foster",
            image: coachIcon,
            jobPosition: "Sales Manager",
            company: "Sales Experts",
            mobileNumber: "+5566778899",
            email: "ethan.foster@example.com"
        },
        {
            name: "Fiona Green",
            image: coachIcon,
            jobPosition: "HR Manager",
            company: "HR Solutions",
            mobileNumber: "+6677889900",
            email: "fiona.green@example.com"
        },
        {
            name: "George Harris",
            image: coachIcon,
            jobPosition: "Business Analyst",
            company: "Business Insights",
            mobileNumber: "+7788990011",
            email: "george.harris@example.com"
        },
        {
            name: "Hannah White",
            image: coachIcon,
            jobPosition: "Project Manager",
            company: "Project Pros",
            mobileNumber: "+8899001122",
            email: "hannah.white@example.com"
        }
    ];

    return players;
};

export default getPlayers