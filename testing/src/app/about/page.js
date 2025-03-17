import MemberCard from "./components/card";

export default function Team() {
  const members = [
    {
      name: "Aakash",
      role: "Software Engineer",
      image: "/Aakash.jpg", // Assuming Aakash.jpg is in the public folder
      linkedin: "https://linkedin.com/in/aakash", // Replace with actual LinkedIn
      github: "https://github.com/aakash", // Replace with actual GitHub
    },
    {
      name: "Jagrat",
      role: "Product Designer",
      image: "/Jagrat.jpg", 
      linkedin: "https://linkedin.com/in/jagrat", 
      github: "https://github.com/jagrat",
    },
    {
      name: "Karan",
      role: "DevOps Engineer",
      image: "/Karan.jpg",
      linkedin: "https://linkedin.com/in/karan",
      github: "https://github.com/karan",
    },
    {
      name: "Rudra",
      role: "Team Lead",
      image: "/Rudra.jpg",
      linkedin: "https://linkedin.com/in/rudra",
      github: "https://github.com/rudra",
    }
  ];

  return (
    <div className="team-container">
      {members.map((member, index) => (
        <MemberCard key={index} {...member} />
      ))}
    </div>
  );
}