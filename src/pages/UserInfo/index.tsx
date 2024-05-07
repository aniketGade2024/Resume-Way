import { AppCard } from "@/components/atoms";
import { Box } from "@mui/material";
import UserInfoStyles from "./styles";
// import useAppStore from "@/store";

const jobSeekersData = [
    {
        name: "John Doe",
        role: {
            resume_role: "Software Engineer",
            job_description_role: "Full Stack Developer"
        },
        location: {
            job_location: "San Francisco, CA",
            resume_location: "San Francisco, CA"
        },
        skills: {
            job_skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express.js"],
            resume_skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express.js", "HTML", "CSS", "Git"]
        },
        education: {
            job_education: "Bachelor's in Computer Science",
            resume_education: "Bachelor's in Computer Science"
        },
        yearsOfExperience: {
            job_experience: 3,
            resume_experience: 4
        },
        responsibilitiesTaken: {
            job_responsibilities: ["Developing user-facing features", "Building reusable components and front-end libraries", "Optimizing applications for maximum speed and scalability"],
            resume_responsibilities: ["Developing and maintaining web applications", "Collaborating with cross-functional teams to define, design, and ship new features", "Troubleshooting and debugging issues"]
        },
        domain: "Technology",
        confidence: 0.85
    },
    {
        name: "Jane Smith",
        role: {
            resume_role: "Data Analyst",
            job_description_role: "Business Intelligence Analyst"
        },
        location: {
            job_location: "New York, NY",
            resume_location: "New York, NY"
        },
        skills: {
            job_skills: ["SQL", "Tableau", "Python", "Data Visualization", "Statistical Analysis"],
            resume_skills: ["SQL", "Tableau", "Python", "Data Visualization", "Statistical Analysis", "Excel", "Power BI"]
        },
        education: {
            job_education: "Master's in Statistics",
            resume_education: "Master's in Statistics"
        },
        yearsOfExperience: {
            job_experience: 2,
            resume_experience: 3
        },
        responsibilitiesTaken: {
            job_responsibilities: ["Analyzing complex datasets", "Creating visualizations and reports for stakeholders", "Identifying trends and insights to optimize business processes"],
            resume_responsibilities: ["Collecting and interpreting data", "Developing and implementing databases, data collection systems, data analytics, and other strategies", "Filtering and cleaning data"]
        },
        domain: "Data Analysis",
        confidence: 0.75
    }
];


const UserInfo = () => {
    const styles = UserInfoStyles();
    // const { resumeInfo } = useAppStore();
    return (
        <Box sx={styles.main}>
            <AppCard resumeInfo={jobSeekersData} />
        </Box>
    )
}
export default UserInfo;