
import { book } from "ionicons/icons";
import book1 from "../assets/img/book1.jpg";
import book2 from "../assets/img/book3_page-0001.jpg";
import book3 from "../assets/img/book4_page-0001.jpg";

const conferencePapers = [
  {
    id: 1,
    authors: "R.Murugadoss, Dr.M.Ramakrishnan",
    title: "Kohonen’s Feature Map based Universal Approximation using Radial Basis Function with Sigmoidal Signals",
    event: "National conference on Pure and Applied Mathematics 2014 (NCPAM’14)",
    date: "April 25th and 26th 2014",
    location: "VIT University, Chennai Campus",
    isbn: "ISBN: 978-93-83459-46-9",
    copyright: "2014 Bonfring",
    pdf: "/journal1"
  },
  {
    id: 2,
    authors: "R.Murugadoss, Dr.M.Ramakrishnan",
    title: "Universal Approximation Using Radial Basis Function with Sigmoidal Signals",
    event: "National conference on Computational and Internetworking Information Technology (NCCIIT’14)",
    date: "March 6th and 7th 2014",
    location: "ANNA UNIVERSITY Regional Centre, Coimbatore",
    pdf: "/pdfs/ai-in-education.pdf"
  },
  {
    id: 3,
    authors: "R.Murugadoss, Dr.M.Ramakrishnan",
    title: "Universal Approximation by Fuzzy Neural Networks Using Sigmoidal Signals",
    event: "National conference on Recent Trends in Advanced Computing",
    date: "19th and 20th September, 2013",
    location: "MANONMANIAM SUNDARANAR UNIVERSITY, Tirunelveli",
    pdf: "/pdfs/ai-in-education.pdf"
  },
  {
    id: 4,
    authors: "R.Murugadoss, Dr.M.Ramakrishnan",
    title: "Universal approximation by Fuzzy Feed Forward Neural networks with Sigmoidal signals and single hidden layer",
    event: "National Conference on ETCS-2K12",
    date: "8th Feb 2012",
    location: "St Ann’s College of Engineering and Technology, Chirala",
    pdf: "/pdfs/ai-in-education.pdf"
  },
  {
    id: 5,
    authors: "R.Murugadoss, Dr.M.Ramakrishnan",
    title: "Studying the performance of ANN on Approximation Problems related to Cryptography",
    event: "National Conference on ETCS-2K12",
    date: "8th Feb 2012",
    location: "St Ann’s College of Engineering and Technology, Chirala",
    pdf: "/pdfs/ai-in-education.pdf"
  },
  {
    id: 6,
    authors: "R.Murugadoss, Dr.M.Ramakrishnan",
    title: "Parallel Communicating Flip Push down automata systems communicating by stacks",
    event: "4th National conference on Recent trends in communication , Electronics and Information Technology NACTECIT 10",
    date: "April 23-24 2010",
    location: "CMR Institute of Technology, Bangalore",
    pdf: "/pdfs/ai-in-education.pdf"
  },
  {
    id: 7,
    authors: "R.Murugadoss, Dr.M.Ramakrishnan",
    title: "Neural Networks Using Right Sigmoidal Signal for Cryptanalysis",
    event: "National Conference on RITCA-2010",
    date: "30th Oct 2010",
    location: "St Ann’s College of Engineering and Technology, Chirala",
    pdf: "/pdfs/ai-in-education.pdf"
  },
  {
    id: 8,
    authors: "R.Murugadoss",
    title: "Collaborative Contribute Group Key Agreement and Authentication Protocols for Dynamic Peer to Peer Networks",
    event: "National Conference on Convergence of IT Research",
    date: "March 09, 2007",
    location: "MEPCO IT’07, Sivakasi",
    pdf: "/pdfs/11.pdf"
  },
  {
    id: 9,
    authors: "R.Murugadoss",
    title: "Collaborative Contribute Group Key Agreement and Authentication Protocols for Dynamic Peer to Peer Networks",
    event: "Third National Conference on Advances in Computer Engineering and Networking",
    date: "March 17, 2007",
    location: "PSNA, Dindigul",
    pdf: "/pdfs/ai-in-education.pdf"
  },

  // === Newly added entries ===
  {
    id: 10,
    authors: "R.Murugadoss, Dr.M.Ramakrishnan",
    title: "IMPLIMENTATION OF MACHINE LEARNING TO DETECT ANDROID MALWARE WITH SIGNIFICANT PERMISSION",
    event: "",                // add conference/event name if known
    date: "",                 // add date if known
    location: "Sathyabama University (Research)", // kept affiliation/location
    pdf: "",                   // add PDF path or URL when available
  },
  {
    id: 11,
    authors: "R.Murugadoss, Dr.M.Ramakrishnan",
    title: "Universal Approximation Using Probabilistic Neural Networks with Sigmoid Activation Functions",
    event: "",                // add conference/event name if known
    date: "",                 // add date if known
    location: "Sathyabama University (Research)", // kept affiliation/location
    pdf: ""                   // add PDF path or URL when available
  }
];




const books = [
  {
    id: 1,
    title: "Advanced Machine Learning Concepts",
    publisher: "Scientific International Publishing House",
    isbn: "978-93-5625-274-5",
    authors: [
      "Dr.R.Murugadoss",
      "Dr. Venkata N Inukollu",
      "Ms. Srilatha Toomula",
      "Dr. Manoranjan Dash"
    ],
    pdf: "/pdfs/11.pdf",
    image: book2,
    
  },
 {
  id: 2,
  title: "Data Exploration and Visualization",
  publisher: "Aasan Publications",
  isbn: "978-93-5625-274-5",
  authors: [
    "Dr. R. Murugadoss",
    "Dr. S. Vijayalakshmi",
    "Dr. M. Santhanakumar"
  ],
  pdf: "/pdfs/01.pdf",
  image: book1,
},
{
  "id": 3,
  "title": "Big Data Analytics",
  "publisher": "Book International Publications",
  "isbn": "978-93-5625-274-5",
  "authors": [
    "Shubham Kuppili",
    "Dr. R. Murugadoss"
  ],
  "pdf": "/pdfs/21.pdf",
  "image": book3,
}
];

 const workshopData = [
    {
      sno: 1,
      topic: "High Performance Computing",
      institution: "Kongu Engineering College",
      duration: "03.08.2007 – 04.08.2007",
      days: 2,
      sponsored: "AICTE"
    },
    {
      sno: 2,
      topic: "Soft computing on Data warehousing & Data Mining",
      institution: "GMRIT, Rajam",
      duration: "09.05.2008 – 18.05.2008",
      days: 10,
      sponsored: "AICTE"
    },
    {
      sno: 3,
      topic: "Image Processing Concepts",
      institution: "Narayana Engg College, Nellore.",
      duration: "30-08-2008",
      days: 1,
      sponsored: "CSE Dept"
    },
    {
      sno: 4,
      topic: "IBM Rational Rose",
      institution: "AITS, Rajampet",
      duration: "12-11-08 – 14-11-08",
      days: 3,
      sponsored: "IEG"
    },
    {
      sno: 5,
      topic: "Workshop on SPARK",
      institution: "NIT, Tiruchirappalli",
      duration: "12-10-2017 – 13-10-2017",
      days: 2,
      sponsored: "NIT, Tiruchirappalli"
    },
    {
      sno: 6,
      topic: "FDP on Machine Learning Techniques for Image Processing and Computer Vision",
      institution: "NIT, Warangal",
      duration: "6-05-2019 to 11-05-2019",
      days: 6,
      sponsored: "E&ICT Academy, NIT Warangal"
    },
    {
      sno: 7,
      topic: "FDP on E-Learning Webinar",
      institution: "Eswar Engineering College, Narasaraopet, Guntur Dist.",
      duration: "11-05-2020 to 15-05-2020",
      days: 5,
      sponsored: "Eswar Engineering College"
    },
    {
      sno: 8,
      topic: "Webinar on How to Write Each Section of Your Paper",
      institution: "Matterhere",
      duration: "17-05-2020",
      days: 1,
      sponsored: "Matterhere"
    },
    {
      sno: 9,
      topic: "Online Webinar on Artificial Intelligence for COVID-19 Problems",
      institution: "RAAK College of Engineering & Technology, Puducherry-605 110.",
      duration: "28-04-2020",
      days: 1,
      sponsored: "Department of CSE"
    },
    {
      sno: 10,
      topic: "Webinar on Amalgamation of Data Science with IOT",
      institution: "KARPAGA VINAYAGA COLLEGE OF ENGINEERING AND TECHNOLOGY, CHENGALPET.",
      duration: "01-05-2020",
      days: 1,
      sponsored: "Department of ECE"
    },
    {
      sno: 11,
      topic: "Webinar on The power of Google Sheet",
      institution: "KARPAGA VINAYAGA COLLEGE OF ENGINEERING AND TECHNOLOGY, CHENGALPET.",
      duration: "15-05-2020",
      days: 1,
      sponsored: "Department of ECE"
    },
    {
      sno: 12,
      topic: "Online FDP on Big Data Tools",
      institution: "St. Martin’s Engineering College, Secundrabad.",
      duration: "18-05-2020 to 23-05-2020",
      days: 6,
      sponsored: "Department of CSE and CSI Hyderabad"
    },
    {
      sno: 13,
      topic: "Online Quiz on Covid-19 Awareness",
      institution: "SR Kanthi College of Education, Ilkal, Karnataka",
      duration: "16-05-2020",
      days: 1,
      sponsored: "S R Kanthi College of Education"
    },
    {
      sno: 14,
      topic: "Online FDP on Blockchain Technology",
      institution: "MADANAPALLE INSTITUTE OF TECHNOLOGY & SCIENCE",
      duration: "30th & 31st May 2020",
      days: 2,
      sponsored: "Department of MCA"
    },
    {
      sno: 15,
      topic: "Online Practical Course on Machine Learning and Deep Learning",
      institution: "ABE Semiconductor Designs, Chennai",
      duration: "18th May-24th May-2020",
      days: 7,
      sponsored: "ABE Semiconductor Designs, Chennai"
    },
    {
      sno: 16,
      topic: "Online STTP on Development of Research Proposals and Funding Opportunities",
      institution: "Tirumala Engineering College, Narasarapet, Guntur Dist.",
      duration: "June 3rd to June 9th 2020",
      days: 7,
      sponsored: "Tirumala Engineering College"
    },
    {
      sno: 17,
      topic: "Online FDP on Artificial Intelligence & It’s Applications",
      institution: "St Ann’s College of Engineering & Technology, Chirala",
      duration: "June 6th to June 11th 2020",
      days: 6,
      sponsored: "NYCI & Brain O Vision"
    },
    {
      sno: 18,
      topic: "Online FDP on Research Methodology – THE ART OF WRITING PERSUASIVE PROJECT PROPOSALS",
      institution: "SANTHIRAM ENGINEERING COLLEGE, NANDYAL",
      duration: "14-06-2020",
      days: 1,
      sponsored: "Department of ECE"
    },
    {
      sno: 19,
      topic: "Webinar on Technology Towards Internet of Things",
      institution: "Panimalar Institute of Technology , Chennai",
      duration: "14-06-2020",
      days: 1,
      sponsored: "Department of CSE"
    },
    {
      sno: 20,
      topic: "Online STTP on Blockchain & It’s Applications",
      institution: "St Ann’s College of Engineering & Technology, Chirala",
      duration: "10th June - 15th June 2020",
      days: 6,
      sponsored: "NYCI & Brain O Vision"
    },
    {
      sno: 21,
      topic: "Cyber Security with Blockchain Technology",
      institution: "KKR & KSR Technology & Sciences, Guntur",
      duration: "25-03-2021 – 31-03-2021",
      days: 6,
      sponsored: "AICTE – ISTE"
    },
    {
      sno: 22,
      topic: "Machine Learning Trends & Applications (Phase – I)",
      institution: "University College of Engineering - Kakinada",
      duration: "30-08-2021 – 04-09-2021",
      days: 6,
      sponsored: "AICTE – AQIS"
    },
    {
      sno: 23,
      topic: "Machine Learning Trends & Applications (Phase – II)",
      institution: "University College of Engineering - Kakinada",
      duration: "27-09-2021 – 02-10-2021",
      days: 6,
      sponsored: "AICTE – AQIS"
    },
    {
      sno: 24,
      topic: "Data Collection, Data Analysis and Data Interpretation",
      institution: "Research Graduate",
      duration: "16-07-2022",
      days: 1,
      sponsored: "Research Graduate"
    },
    {
      sno: 25,
      topic: "FDP on Big Data Analytics - Research Perspectives and Tools",
      institution: "SCOPE, VIT Chennai",
      duration: "01.08.2022 to 05.08.2022",
      days: 5,
      sponsored: "SCOPE, VIT Chennai"
    },
    {
      sno: 26,
      topic: "FDP on Research Trends and Technologies in Industry 4.0",
      institution: "KKR & KSR INSTITUTE OF TECHNOLOGY AND SCIENCES, Guntur",
      duration: "26th-30th September, 2022",
      days: 5,
      sponsored: "Dept. of Artificial Intelligence"
    },
    {
      sno: 27,
      topic: "Faculty Induction Workshop on Thrust Areas",
      institution: "Madanapalle Institute of Technology & Science, AP",
      duration: "10.10.2022 to 15.10.2022",
      days: 7,
      sponsored: "IEEE/MITS/CSE"
    },
    {
      sno: 28,
      topic: "Infosys Springboard Programme",
      institution: "INFOSYS Springboard", 
      duration: "Friday, October 14th 2022",
      days: 1,
      sponsored: "INFOSYS Springboard"
    },
    {
      sno: 29,
      topic: "Intelligent Computing for Next Generation Embedded IoT",
      institution: "Sri Krishna College of Engineering and Technology, Coimbatore",
      duration: "26.10.2022 to 28.10.2022",
      days: 3,
      sponsored: "Dept. of IT"
    },
    {
      sno: 30,
      topic: "APPLICATIONS OF AI, ML AND DATA SCIENCE",
      institution: "KKR & KSR INSTITUTE OF TECHNOLOGY AND SCIENCES, Guntur",
      duration: "12th-17th December, 2022",
      days: 7,
      sponsored: "Dept. of AI"
    }
  ];

export default conferencePapers;
export { books ,workshopData };
