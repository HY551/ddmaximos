import React, { useState } from "react";
import styled from "styled-components";
import { jsPDF } from "jspdf";
const dummyData = [
  {
    name: "ABD AL-BAQI NASHWAN ABD AL-RAZZAQ",
    dob: "--/--/1961",
    pob: "Mosul, Iraq",
    aliases: ["ALI, Abdul, Hadi, Arif", "AL-IRAQI, Abd, Al-Hadi", "MOHAMMED, Omar, Uthman"],
    nationality: "Iraq",
    sanctionsRef: "AQD0271",
    interpolLink: "https://www.interpol.int/en/notice/search/un/1475995",
    score: 55, // Based on detailed history and international records
    details:
      "Joined Al-Qaida in 1996 and was a liaison to the Taliban. Involved in attacks in Iraq during 2005. Al-Qaida senior official.",
  },
  {
    name: "'ABD AL-SALAM SAID JAN",
    dob: "05/02/1981",
    pob: "Afghanistan",
    aliases: ["ABD-AL-SALAM, Sa'id Jan", "KHAN, Dilawar, Khan, Zain"],
    nationality: "Afghanistan",
    sanctionsRef: "AQD0302",
    interpolLink: "https://www.interpol.int/en/notice/search/un/1928966",
    score: 65,
    details:
      "Ran a basic training camp for Al-Qaida in Pakistan in 2005. Used passports from Afghanistan and Pakistan under aliases.",
  },
  {
    name: "ABDEL RAHMAN ABD ALLAH MOHAMED RAGAB",
    dob: "03/11/1957",
    pob: "Kafr Al-Shaykh, Egypt",
    aliases: ["ABU, Al-Khayr", "ABU, Jihad", "AHMAD, Hasan"],
    nationality: "Egypt",
    sanctionsRef: "AQD0090",
    interpolLink: "https://www.interpol.int/en/notice/search/un/4493165",
    score: 82,
    details:
      "Member of Egyptian Islamic Jihad. Participated in multiple reviews under UN sanctions resolutions. Active in Pakistan and Afghanistan.",
  },
  {
    name: "ABDUL CHAUDHRY MAJEED",
    dob: "15/04/1939",
    pob: "Pakistan",
    aliases: ["ABDUL, Majeed", "ABDUL, Majid"],
    nationality: "Pakistan",
    sanctionsRef: "AQD0222",
    interpolLink: "https://www.interpol.int/en/notice/search/un/1422960",
    score: 55,
    details: "Reportedly deceased. Sanctioned under UN resolutions for involvement in terrorist activities.",
  },
  {
    name: "ABDUL RAHMAN MUHAMMAD JABRIL",
    dob: "28/05/1984",
    pob: "East Lombok, West Nusa Tenggara, Indonesia",
    aliases: ["ABDUL RAHMAN, Muhammad, Jibriel", "ARDHAN, Muhamad, Ricky"],
    nationality: "Indonesia",
    sanctionsRef: "AQD0261",
    interpolLink: "https://www.interpol.int/en/notice/search/un/4555825",
    score: 74,
    details:
      "Senior member of Jemaah Islamiyah. Involved in obtaining funding for terrorist attacks. Sentenced to five years in prison in 2010.",
  },
  {
    name: "ABDUL SAYED ALY SOLIMAN MASSOUD",
    dob: "--/--/1969",
    pob: "Tripoli, Libya",
    aliases: ["EL QAIM, Ibn", "OSMAN, Mohamed"],
    nationality: "Libya",
    sanctionsRef: "AQD0135",
    interpolLink: "https://www.interpol.int/en/notice/search/un/1479979",
    score: 62,
    details: "Member of Libyan Islamic Fighting Group. Sanctioned under multiple UN resolutions.",
  },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const filteredData = dummyData.filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filteredData);
  };

  const handleDownloadPDF = (person) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Details of ${person.name}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Date of Birth: ${person.dob}`, 10, 20);
    doc.text(`Place of Birth: ${person.pob}`, 10, 30);
    doc.text(`Nationality: ${person.nationality}`, 10, 40);
    doc.text(`Aliases: ${person.aliases.join(", ")}`, 10, 50);
    doc.text(`Sanctions Reference: ${person.sanctionsRef}`, 10, 60);
    doc.text(`Details: ${person.details}`, 10, 70);
    doc.text(`More Information: ${person.interpolLink}`, 10, 80);

    doc.save(`${person.name.replace(/\s+/g, "_")}_Details.pdf`);
  };

  return (
    <Wrapper>
      <Navbar>
        <NavLogo>DDMaximos</NavLogo>
        <NavItems>
          <NavItem>Home</NavItem>
          <NavItem>About</NavItem>
          <NavItem>Contact</NavItem>
        </NavItems>
      </Navbar>

      <MainSection>
        <SearchContainer>
          <SearchTitle>Discover a Person</SearchTitle>
          <SearchInput
            type="text"
            placeholder="Enter a name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </SearchContainer>

        <ResultsContainer>
          {results.length === 0 ? (
            <NoResults>No results found. Try searching for someone!</NoResults>
          ) : (
            results.map((person, index) => (
              <ResultCard key={index}>
                <CircularScore score={person.score}>
                  <ScoreText>{person.score}</ScoreText>
                </CircularScore>
                <ResultContent>
                  <ResultName>{person.name}</ResultName>
                  <ResultDetails>{person.details}</ResultDetails>
                  <DownloadButton onClick={() => handleDownloadPDF(person)}>
                    Download Full Info as PDF
                  </DownloadButton>
                </ResultContent>
              </ResultCard>
            ))
          )}
        </ResultsContainer>
      </MainSection>

      <Footer>
        <FooterText>© 2025 DDMaximos. All rights reserved.</FooterText>
      </Footer>
    </Wrapper>
  );
};

export default App;



export const DownloadButton = styled.button`
  margin-top: 1rem;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  color: white;
  background: #3498db;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #2980b9;
  }
`;

// Wrapper and Layout
export const Wrapper = styled.div`
  font-family: "Arial", sans-serif;
  color: #333;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #34495e;
  padding: 1rem 2rem;
  color: white;
`;

export const NavLogo = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
`;

export const NavItems = styled.div`
  display: flex;
  gap: 2rem;
`;

export const NavItem = styled.div`
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #1abc9c;
  }
`;

export const MainSection = styled.main`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #ecf0f1, #bdc3c7);
`;

// Search Section
export const SearchContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

export const SearchTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
`;

export const SearchInput = styled.input`
  width: 350px;
  padding: 0.8rem;
  border: 2px solid #2c3e50;
  border-radius: 8px;
  font-size: 1.1rem;
  margin-right: 1rem;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #1abc9c;
    outline: none;
  }
`;

export const SearchButton = styled.button`
  padding: 0.8rem 1.8rem;
  font-size: 1.1rem;
  color: white;
  background: #1abc9c;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #16a085;
  }
`;

// Results Section
export const ResultsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ResultCard = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #2c3e50;
  border-radius: 10px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  gap: 1.5rem;
`;

export const CircularScore = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: conic-gradient(
    ${({ score }) =>
      score > 80
        ? "#1abc9c 0% " + score + "%"
        : score > 60
        ? "#f39c12 0% " + score + "%"
        : "#e74c3c 0% " + score + "%"},
    #ecf0f1 ${props => props.score}% 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;

export const ScoreText = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

export const ResultContent = styled.div`
  flex: 1;
`;

export const ResultName = styled.h3`
  font-size: 1.5rem;
  color: #2c3e50;
`;

export const ResultDetails = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
`;

export const NoResults = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  text-align: center;
`;

// Footer
export const Footer = styled.footer`
  background: #34495e;
  color: white;
  text-align: center;
  padding: 1rem;
`;

export const FooterText = styled.p`
  font-size: 0.9rem;
  margin: 0;
`;
