import MemberCard from "./components/card";

export default function Team() {
  const members = [
    {
      name: "John Doe",
      role: "Software Engineer",
      image: "https://via.placeholder.com/100",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
    },
    {
      name: "Jane Smith",
      role: "Product Designer",
      image: "https://via.placeholder.com/100",
      linkedin: "https://linkedin.com/in/janesmith",
      github: "https://github.com/janesmith",
    },
    {
      name: "Mike Johnson",
      role: "DevOps Engineer",
      image: "https://via.placeholder.com/100",
      linkedin: "https://linkedin.com/in/mikejohnson",
      github: "https://github.com/mikejohnson",
    },
  ];

  return (
    <div className="team-container">
      {members.map((member, index) => (
        <MemberCard key={index} {...member} />
      ))}
    </div>
  );
}
