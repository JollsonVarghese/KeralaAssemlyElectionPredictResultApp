import React, { useMemo, useState } from "react";

const DISTRICTS = [
  {
    district: "Kasaragod",
    seats: [
      { seat: "Manjeshwaram", candidates: ["K. R. Jayanandan (LDF)", "A. K. M. Ashraf (UDF)", "K. Surendran (NDA)"] },
      { seat: "Kasaragod", candidates: ["Shanavas Padhoor (LDF)", "Kallatra Mahin Haji (UDF)", "M. L. Ashwini (NDA)"] },
      { seat: "Udma", candidates: ["C. H. Kunhambu (LDF)", "K. Neelakandan (UDF)", "Manulal Meloth (NDA)"] },
      { seat: "Kanhangad", candidates: ["Govindan Pallikkappil (LDF)", "Shyji Ottapalli (UDF)", "M. Balraj (NDA)"] },
      { seat: "Thrikaripur", candidates: ["V. P. P. Mustafa (LDF)", "Sandeep Varier (UDF)", "Ravi Kulangara (NDA)"] },
    ],
  },
  {
    district: "Kannur",
    seats: [
      { seat: "Payyanur", candidates: ["T. I. Madhusoodanan (LDF)", "V. Kunjikrishnan (UDF)", "A. P. Gangadharan (NDA)"] },
      { seat: "Kalliasseri", candidates: ["M. Vijin (LDF)", "Rajeevan Kappachery (UDF)", "A. V. Anilkumar (NDA)"] },
      { seat: "Taliparamba", candidates: ["P. K. Shyamala (LDF)", "T. K. Govindan (UDF)", "N. Haridas (NDA)"] },
      { seat: "Irikkur", candidates: ["Mathew Kunnapally (LDF)", "Sajeev Joseph (UDF)", "Srinath Padmanabhan (NDA)"] },
      { seat: "Azhikode", candidates: ["K. V. Sumesh (LDF)", "Kareem Cheleri (UDF)", "K. K. Vinod Kumar (NDA)"] },
      { seat: "Kannur", candidates: ["Kadanappalli Ramachandran (LDF)", "T. O. Mohanan (UDF)", "C. Raghunath (NDA)"] },
      { seat: "Dharmadom", candidates: ["Pinarayi Vijayan (LDF)", "Abdul Rasheed (UDF)", "K. Ranjith (NDA)"] },
      { seat: "Thalassery", candidates: ["Karayi Rajan (LDF)", "K. P. Saju (UDF)", "O. Nidheesh (NDA)"] },
      { seat: "Kuthuparamba", candidates: ["P. K. Praveen (LDF)", "Jayanthi Rajan (UDF)", "Shijilal (NDA)"] },
      { seat: "Mattanur", candidates: ["V. K. Sanoj (LDF)", "Chandran Thillenkeri (UDF)", "Biju Elakkuzhi (NDA)"] },
      { seat: "Peravoor", candidates: ["K. K. Shailaja (LDF)", "Sunny Joseph (UDF)", "Paily Vathiatt (NDA)"] },
    ],
  },
  {
    district: "Wayanad",
    seats: [
      { seat: "Mananthavady", candidates: ["O. R. Kelu (LDF)", "Usha Vijayan (UDF)", "P. Shyam Raj (NDA)"] },
      { seat: "Sulthan Bathery", candidates: ["M. S. Viswanathan (LDF)", "I. C. Balakrishnan (UDF)", "A. S. Kavitha (NDA)"] },
      { seat: "Kalpetta", candidates: ["P. K. Anil Kumar (LDF)", "T. Siddique (UDF)", "Prashanth Malavayal (NDA)"] },
    ],
  },
  {
    district: "Kozhikode",
    seats: [
      { seat: "Vatakara", candidates: ["M. K. Bhaskaran (LDF)", "K. K. Rema (UDF)", "K. Dileep (NDA)"] },
      { seat: "Kuttiady", candidates: ["K. P. Kunhammadkutty (LDF)", "Parakkal Abdulla (UDF)", "Ramadas Manaleri (NDA)"] },
      { seat: "Nadapuram", candidates: ["P. Vasantham (LDF)", "K. M. Abhijith (UDF)", "C. P. Vipin Chandran (NDA)"] },
      { seat: "Koyilandy", candidates: ["K. Dasan (LDF)", "K. Praveen Kumar (UDF)", "C. R. Praphul Krishnan (NDA)"] },
      { seat: "Perambra", candidates: ["T. P. Ramakrishnan (LDF)", "Fathima Thahiliya (UDF)", "M. Mohanan Master (NDA)"] },
      { seat: "Balussery", candidates: ["K. M. Sachin Dev (LDF)", "V. T. Sooraj (UDF)", "C. P. Sateeshan (NDA)"] },
      { seat: "Elathur", candidates: ["A. K. Saseendran (LDF)", "Vidya Balakrishnan (UDF)", "T. Devadas (NDA)"] },
      { seat: "Kozhikode North", candidates: ["Thottathil Ravindran (LDF)", "K. Jayanth (UDF)", "Navya Haridas (NDA)"] },
      { seat: "Kozhikode South", candidates: ["Ahamed Devarkovil (LDF)", "Faisal Babu (UDF)", "T. Reneesh (NDA)"] },
      { seat: "Beypore", candidates: ["P. A. Mohammed Riyas (LDF)", "P. V. Anvar (UDF)", "K. P. Prakash Babu (NDA)"] },
      { seat: "Kunnamangalam", candidates: ["P. T. A. Rahim (LDF)", "M. A. Razak Master (UDF)", "V. K. Sajeevan (NDA)"] },
      { seat: "Koduvally", candidates: ["Saleem Madavoor (LDF)", "P. K. Firos (UDF)", "Giri Pambanal (NDA)"] },
      { seat: "Thiruvambady", candidates: ["Linto Joseph (LDF)", "C. K. Kasim (UDF)", "Sunny Thomas (NDA)"] },
    ],
  },
  {
    district: "Malappuram",
    seats: [
      { seat: "Kondotty", candidates: ["P. Jiji (LDF)", "T. P. Ashrafali (UDF)", "P. Subhramanyan (NDA)"] },
      { seat: "Eranad", candidates: ["Shafeer Kizhisery (LDF)", "P. K. Basheer (UDF)", "N. Sreeprakash (NDA)"] },
      { seat: "Nilambur", candidates: ["U. Sharafali (LDF)", "Aryadan Shoukath (UDF)", "Gireesh Mekkad (NDA)"] },
      { seat: "Wandoor", candidates: ["K. K. Damodaran (LDF)", "A. P. Anil Kumar (UDF)", "E. P. Kumaradas (NDA)"] },
      { seat: "Manjeri", candidates: ["M. Mustafa (LDF)", "M. Rahmathulla (UDF)", "Pathmasree M. (NDA)"] },
      { seat: "Perinthalmanna", candidates: ["V. P. Muhammad Haneefa (LDF)", "Najeeb Kanthapuram (UDF)", "K. P. Baburaj (NDA)"] },
      { seat: "Mankada", candidates: ["Kunnath Muhammed (LDF)", "Manjalamkuzhi Ali (UDF)", "Lijoy Paul (NDA)"] },
      { seat: "Malappuram", candidates: ["T. Mujeeb (LDF)", "P. K. Kunhalikutty (UDF)", "Aswathy Gupthakumar (NDA)"] },
      { seat: "Vengara", candidates: ["Muhammad Sabah Kundukuzhikkal (LDF)", "K. M. Shaji (UDF)", "Jayakrishnan V. N. (NDA)"] },
      { seat: "Vallikkunnu", candidates: ["C. P. Musthafa (LDF)", "T. V. Ibrahim (UDF)", "M. Preman Master (NDA)"] },
      { seat: "Tirurangadi", candidates: ["Ajit Koladi (LDF)", "P. M. A. Sameer (UDF)", "Riju C. Raghav (NDA)"] },
      { seat: "Tanur", candidates: ["P. Mohammed Sameer (LDF)", "P. K. Navas (UDF)", "Deepa Puzhakkal (NDA)"] },
      { seat: "Tirur", candidates: ["V. Abdurahiman (LDF)", "Kurukkoli Moideen (UDF)", "K. Narayanan Master (NDA)"] },
      { seat: "Kottakkal", candidates: ["Preethi Konchath (LDF)", "K. K. Abid Hussain Thangal (UDF)", "Subrahmanian Chunkapally (NDA)"] },
      { seat: "Thavanur", candidates: ["K. T. Jaleel (LDF)", "V. S. Joy (UDF)", "Ravi Thelath (NDA)"] },
      { seat: "Ponnani", candidates: ["M. K. Sakeer (LDF)", "K. P. Noushad Ali (UDF)", "E. Maneesh (NDA)"] },
    ],
  },
  {
    district: "Palakkad",
    seats: [
      { seat: "Thrithala", candidates: ["M. B. Rajesh (LDF)", "V. T. Balram (UDF)", "V. Unnikrishnan Master (NDA)"] },
      { seat: "Pattambi", candidates: ["Muhammed Muhsin (LDF)", "T. P. Shaji (UDF)", "P. Manoj (NDA)"] },
      { seat: "Shornur", candidates: ["P. Mammikutty (LDF)", "P. Harigovindan Master (UDF)", "Sanku T. Das (NDA)"] },
      { seat: "Ottapalam", candidates: ["K. Premkumar (LDF)", "P. K. Sasi (UDF)", "Major Ravi (NDA)"] },
      { seat: "Kongad", candidates: ["K. Shanthakumari (LDF)", "K. A. Thulasi (UDF)", "Renu Suresh (NDA)"] },
      { seat: "Mannarkkad", candidates: ["Mansil Abubacker (LDF)", "N. Samsudheen (UDF)", "Issac Varghese (NDA)"] },
      { seat: "Malampuzha", candidates: ["A. Prabhakaran (LDF)", "A. Suresh (UDF)", "C. Krishnakumar (NDA)"] },
      { seat: "Palakkad", candidates: ["N. M. R. Rasakh (LDF)", "Ramesh Pisharody (UDF)", "Sobha Surendran (NDA)"] },
      { seat: "Tarur", candidates: ["P. P. Sumod (LDF)", "K. C. Subramanian (UDF)", "Suresh Babu (NDA)"] },
      { seat: "Chittur", candidates: ["V. Murugadas (LDF)", "Sumesh Achuthan (UDF)", "Pranesh Rajendran (NDA)"] },
      { seat: "Nenmara", candidates: ["K. Preman (LDF)", "A. Thankappan (UDF)", "A. N. Anurag (NDA)"] },
      { seat: "Alathur", candidates: ["T. M. Sasi (LDF)", "K. N. Febin (UDF)", "K. V. Prasanna Kumar (NDA)"] },
    ],
  },
  {
    district: "Thrissur",
    seats: [
      { seat: "Chelakkara", candidates: ["U. R. Pradeep (LDF)", "Sivan Veettikkunnu (UDF)", "K. Balakrishnan (NDA)"] },
      { seat: "Kunnamkulam", candidates: ["A. C. Moideen (LDF)", "P. T. Ajay Mohan (UDF)", "Rijil K. R. (NDA)"] },
      { seat: "Guruvayur", candidates: ["N. K. Akbar (LDF)", "C. H. Rasheed (UDF)", "B. Gopalakrishnan (NDA)"] },
      { seat: "Manalur", candidates: ["C. Raveendranath (LDF)", "T. N. Prathapan (UDF)", "K. K. Aneesh Kumar (NDA)"] },
      { seat: "Wadakkanchery", candidates: ["Xavier Chittilappilly (LDF)", "Vyshak Narayanaswami (UDF)", "T. S. Ullas Babu (NDA)"] },
      { seat: "Ollur", candidates: ["K. Rajan (LDF)", "Shaji Kodankandath (UDF)", "Bijoy Thomas (NDA)"] },
      { seat: "Thrissur", candidates: ["Alankode Leelakrishnan (LDF)", "Rajan Pallan (UDF)", "Padmaja Venugopal (NDA)"] },
      { seat: "Nattika", candidates: ["Geetha Gopi (LDF)", "Sunil Lalur (UDF)", "C. C. Mukundan (NDA)"] },
      { seat: "Kaipamangalam", candidates: ["K. K. Valsaraj (LDF)", "T. M. Nazar (UDF)", "Athulya Ghosh (NDA)"] },
      { seat: "Irinjalakuda", candidates: ["R. Bindu (LDF)", "Thomas Unniyadan (UDF)", "Santhosh Cherkalam (NDA)"] },
      { seat: "Puthukkad", candidates: ["K. K. Ramachandran (LDF)", "K. M. Babu Raj (UDF)", "A. Nagesh (NDA)"] },
      { seat: "Chalakudy", candidates: ["Biju Chirayath (LDF)", "T. J. Saneesh Kumar Joseph (UDF)", "Charly Paul (NDA)"] },
      { seat: "Kodungallur", candidates: ["V. R. Sunil (LDF)", "O. J. Janeesh (UDF)", "Varghese George (NDA)"] },
    ],
  },
  {
    district: "Ernakulam",
    seats: [
      { seat: "Perumbavoor", candidates: ["Basil Paul (LDF)", "Manoj Moothedan (UDF)", "Jibi Pathickal (NDA)"] },
      { seat: "Angamaly", candidates: ["Saju Paul (LDF)", "Roji M. John (UDF)", "Promy Kuriakose (NDA)"] },
      { seat: "Aluva", candidates: ["A. M. Ariff (LDF)", "Anwar Sadath (UDF)", "M. A. Brahmaraj (NDA)"] },
      { seat: "Kalamassery", candidates: ["P. Rajeeve (LDF)", "V. E. Abdul Gafoor (UDF)", "M. P. Binu (NDA)"] },
      { seat: "Paravur", candidates: ["E. T. Taison (LDF)", "V. D. Satheesan (UDF)", "Vathsala Prasanna Kumar (NDA)"] },
      { seat: "Vypin", candidates: ["M. B. Shaini (LDF)", "Tony Chammany (UDF)", "Anitha Thomas (NDA)"] },
      { seat: "Kochi", candidates: ["K. J. Maxi (LDF)", "Mohammad Shiyas (UDF)", "Xavier Joolappan (NDA)"] },
      { seat: "Thrippunithura", candidates: ["K. N. Unnikrishnan (LDF)", "Deepak Joy (UDF)", "Anjali Nair (NDA)"] },
      { seat: "Ernakulam", candidates: ["Sabu George (LDF)", "T. J. Vinod (UDF)", "P. R. Shivashankaran (NDA)"] },
      { seat: "Thrikkakara", candidates: ["Pushpa Das (LDF)", "Uma Thomas (UDF)", "Akhil Marar (NDA)"] },
      { seat: "Kunnathunad", candidates: ["P. V. Srinijin (LDF)", "V. P. Sajeendran (UDF)", "Babu Divakaran (NDA)"] },
      { seat: "Piravom", candidates: ["Sabu K. Jacob (LDF)", "Anoop Jacob (UDF)", "Jibi Abraham (NDA)"] },
      { seat: "Muvattupuzha", candidates: ["N. Arun (LDF)", "Mathew Kuzhalnadan (UDF)", "Sunny Kadoothazhe (NDA)"] },
      { seat: "Kothamangalam", candidates: ["Antony John (LDF)", "Shibu Thekkumpuram (UDF)", "Aji Narayanan (NDA)"] },
    ],
  },
  {
    district: "Idukki",
    seats: [
      { seat: "Devikulam", candidates: ["A. Raja (LDF)", "F. Raja (UDF)", "S. Rajendran (NDA)"] },
      { seat: "Udumbanchola", candidates: ["K. K. Jayachandran (LDF)", "Senapathy Venu (UDF)", "Sangeetha Viswanathan (NDA)"] },
      { seat: "Thodupuzha", candidates: ["Cyriac Chazhikaadan (LDF)", "Apu John Joseph (UDF)", "Roy A. Varikkadu (NDA)"] },
      { seat: "Idukki", candidates: ["Roshy Augustine (LDF)", "Roy K. Paulose (UDF)", "Pratheesh Prabha (NDA)"] },
      { seat: "Peerumade", candidates: ["K. Salim Kumar (LDF)", "Cyriac Thomas (UDF)", "V. Ratheesh (NDA)"] },
    ],
  },
  {
    district: "Kottayam",
    seats: [
      { seat: "Pala", candidates: ["Jose K. Mani (LDF)", "Mani C. Kappan (UDF)", "Shone George (NDA)"] },
      { seat: "Kaduthuruthy", candidates: ["Nirmala Jimmy (LDF)", "Mons Joseph (UDF)", "Suresh Ettikunnel (NDA)"] },
      { seat: "Vaikom", candidates: ["P. Pradeep (LDF)", "K. Binimon (UDF)", "K. Ajith (NDA)"] },
      { seat: "Ettumanoor", candidates: ["V. N. Vasavan (LDF)", "Nattakom Suresh (UDF)", "Athira D. Nair (NDA)"] },
      { seat: "Kottayam", candidates: ["K. Anilkumar (LDF)", "Thiruvanchoor Radhakrishnan (UDF)", "P. Anilkumar (NDA)"] },
      { seat: "Puthuppally", candidates: ["K. M. Radhakrishnan (LDF)", "Chandy Oommen (UDF)", "Ravindranath Vakathanam (NDA)"] },
      { seat: "Changanassery", candidates: ["Job Michael (LDF)", "Vinu Job (UDF)", "B. Radhakrishna Menon (NDA)"] },
      { seat: "Kanjirappally", candidates: ["N. Jayaraj (LDF)", "Rony K Baby (UDF)", "George Kurian (NDA)"] },
      { seat: "Poonjar", candidates: ["Sebastian Kulathunkal (LDF)", "Sebastian M. J. (UDF)", "P. C. George (NDA)"] },
    ],
  },
  {
    district: "Alappuzha",
    seats: [
      { seat: "Aroor", candidates: ["Daleema (LDF)", "Shanimol Usman (UDF)", "P. S. Jyothis (NDA)"] },
      { seat: "Cherthala", candidates: ["P. Prasad (LDF)", "K. R. Rajendra Prasad (UDF)", "T. P. Anantharaj (NDA)"] },
      { seat: "Alappuzha", candidates: ["P. P. Chitharanjan (LDF)", "A.D. Thomas (UDF)", "M. J. Job (NDA)"] },
      { seat: "Ambalappuzha", candidates: ["H. Salam (LDF)", "G. Sudhakaran (UDF)", "Arun Anirudhan (NDA)"] },
      { seat: "Kuttanad", candidates: ["Thomas K. Thomas (LDF)", "Reji Cheriyan (UDF)", "Santhosh Santhy (NDA)"] },
      { seat: "Haripad", candidates: ["T. T. Jismon (LDF)", "Ramesh Chennithala (UDF)", "Sandeep Vachaspati (NDA)"] },
      { seat: "Kayamkulam", candidates: ["U. Prathibha (LDF)", "M. Liju (UDF)", "Thambi Mettuthara (NDA)"] },
      { seat: "Mavelikara", candidates: ["M. S. Arun Kumar (LDF)", "Muthara Raj (UDF)", "Ajimon (NDA)"] },
      { seat: "Chengannur", candidates: ["Saji Cherian (LDF)", "Eby Kuriakose (UDF)", "M. V. Gopakumar (NDA)"] },
    ],
  },
  {
    district: "Pathanamthitta",
    seats: [
      { seat: "Thiruvalla", candidates: ["Mathew T. Thomas (LDF)", "Varghese Mammen (UDF)", "Anoop Antony (NDA)"] },
      { seat: "Ranni", candidates: ["Pramod Narayanan (LDF)", "Pazhakulam Madhu (UDF)", "Thomas K. Samuel (NDA)"] },
      { seat: "Aranmula", candidates: ["Veena George (LDF)", "Abin Varkey (UDF)", "Kummanam Rajasekharan (NDA)"] },
      { seat: "Konni", candidates: ["K. U. Jenish Kumar (LDF)", "Satheesh Kochuparambil (UDF)", "T. P. Sundareshan (NDA)"] },
      { seat: "Adoor", candidates: ["Praji Sashidharan (LDF)", "Santhakumar (UDF)", "Pandalam Prathapan (NDA)"] },
    ],
  },
  {
    district: "Kollam",
    seats: [
      { seat: "Karunagappally", candidates: ["M. S. Thara (LDF)", "C. R. Mahesh (UDF)", "V. S. Jithin Dev (NDA)"] },
      { seat: "Chavara", candidates: ["Sujith Vijayanpillai (LDF)", "Shibu Baby John (UDF)", "K. R. Rajesh (NDA)"] },
      { seat: "Kunnathur", candidates: ["Kovoor Kunjumon (LDF)", "Ullas Kovoor (UDF)", "Raji Prasad (NDA)"] },
      { seat: "Kottarakkara", candidates: ["K. N. Balagopal (LDF)", "P. Aisha Potty (UDF)", "R. Reshmi (NDA)"] },
      { seat: "Pathanapuram", candidates: ["K. B. Ganesh Kumar (LDF)", "Jyothikumar Chamakkala (UDF)", "Anil Kumar S. (NDA)"] },
      { seat: "Punalur", candidates: ["C. Ajaya Prasad (LDF)", "Noushad Yunus (UDF)", "B. Raghunathan Pillai (NDA)"] },
      { seat: "Chadayamangalam", candidates: ["J. Chinchu Rani (LDF)", "M. M. Nazeer (UDF)", "R. S. Arun Raj (NDA)"] },
      { seat: "Kundara", candidates: ["S. L. Sajikumar (LDF)", "P. C. Vishnunadh (UDF)", "Robin Radhakrishnan (NDA)"] },
      { seat: "Kollam", candidates: ["S. Jayamohan (LDF)", "Bindhu Krishna (UDF)", "N. Prathap Kumar (NDA)"] },
      { seat: "Eravipuram", candidates: ["M. Noushad (LDF)", "Vishnu Mohan (UDF)", "Saji D. Anand (NDA)"] },
      { seat: "Chathannoor", candidates: ["R. Rajendran (LDF)", "Sooraj Ravi (UDF)", "B. B. Gopakumar (NDA)"] },
    ],
  },
  {
    district: "Thiruvananthapuram",
    seats: [
      { seat: "Varkala", candidates: ["V. Joy (LDF)", "Varkala Kahar (UDF)", "S. Smitha (NDA)"] },
      { seat: "Attingal", candidates: ["O. S. Ambika (LDF)", "Santhosh Bhadran (UDF)", "P. Sudheer (NDA)"] },
      { seat: "Chirayinkeezhu", candidates: ["Manoj Idamana (LDF)", "Ramya Haridas (UDF)", "B. S. Anoop (NDA)"] },
      { seat: "Nedumangad", candidates: ["G. R. Anil (LDF)", "Meenankal Kumar (UDF)", "Yuvaraj Gokul (NDA)"] },
      { seat: "Vamanapuram", candidates: ["D. K. Murali (LDF)", "Sudheersha Palode (UDF)", "Venu Karanavar (NDA)"] },
      { seat: "Kazhakkoottam", candidates: ["Kadakampally Surendran (LDF)", "Sarathchandra Prasad (UDF)", "V. Muraleedharan (NDA)"] },
      { seat: "Vattiyoorkavu", candidates: ["V. K. Prasanth (LDF)", "K. Muraleedharan (UDF)", "R. Sreelekha (NDA)"] },
      { seat: "Thiruvananthapuram", candidates: ["Sudheer Karamana (LDF)", "C. P. John (UDF)", "Karamana Jayan (NDA)"] },
      { seat: "Nemom", candidates: ["V. Sivankutty (LDF)", "K. S. Sabarinadhan (UDF)", "Rajeev Chandrasekhar (NDA)"] },
      { seat: "Aruvikkara", candidates: ["G. Steephen (LDF)", "V. S. Sivakumar (UDF)", "Vivek Gopan (NDA)"] },
      { seat: "Parassala", candidates: ["C. K. Hareendran (LDF)", "Neyyattinkara Sanal (UDF)", "Gireesh Neyyar (NDA)"] },
      { seat: "Kattakkada", candidates: ["I. B. Sathish (LDF)", "M. R. Baiju (UDF)", "P. K. Krishnadas (NDA)"] },
      { seat: "Kovalam", candidates: ["Bhagat Rufus (LDF)", "M. Vincent (UDF)", "T. N. Suresh (NDA)"] },
      { seat: "Neyyattinkara", candidates: ["K. Ancelan (LDF)", "N. Sakthan (UDF)", "S. Rajasekharan Nair (NDA)"] },
    ],
  },
];

const STORAGE_KEY = "kerala-poll-submissions";

function getAllSeats() {
  return DISTRICTS.flatMap((district) =>
    district.seats.map((seat) => ({ district: district.district, seat: seat.seat, candidates: seat.candidates }))
  );
}

function loadSubmissions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSubmissions(submissions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

export default function KeralaPollSite() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submissions, setSubmissions] = useState(() =>
    typeof window !== "undefined" ? loadSubmissions() : []
  );
  const [selectedFriends, setSelectedFriends] = useState([]);

  const allSeats = useMemo(() => getAllSeats(), []);
  const completion = `${Object.keys(answers).length}/${allSeats.length}`;

  const startVoting = () => {
    if (!name.trim()) return;
    setStarted(true);
  };

  const updateAnswer = (district, seat, candidate) => {
    const key = `${district}__${seat}`;
    setAnswers((prev) => ({ ...prev, [key]: candidate }));
  };

  const submitPrediction = () => {
    if (!name.trim()) return;
    const record = {
      id: `${name.trim().toLowerCase()}-${Date.now()}`,
      name: name.trim(),
      submittedAt: new Date().toLocaleString(),
      answers,
    };
    const updated = [...submissions.filter((s) => s.name.toLowerCase() !== name.trim().toLowerCase()), record];
    setSubmissions(updated);
    saveSubmissions(updated);
    if (!selectedFriends.includes(record.name)) {
      setSelectedFriends((prev) => [...prev, record.name].slice(0, 4));
    }
    alert("Prediction submitted successfully.");
  };

  const toggleFriend = (friendName) => {
    setSelectedFriends((prev) =>
      prev.includes(friendName)
        ? prev.filter((f) => f !== friendName)
        : [...prev, friendName].slice(0, 4)
    );
  };

  const visibleSubmissions = submissions.filter((s) => selectedFriends.includes(s.name));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Kerala Assembly Prediction Poll</h1>
              <p className="mt-2 text-sm text-slate-600">
                Enter your name, pick a predicted winner for each seat, and compare your choices with friends.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium">
              Progress: {completion}
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none ring-0 focus:border-slate-500"
            />
            <button
              onClick={startVoting}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-white transition hover:opacity-90"
            >
              Start / Continue
            </button>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            {started ? (
              DISTRICTS.map((district) => (
                <section key={district.district} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <h2 className="text-2xl font-semibold">{district.district}</h2>
                  <div className="mt-4 space-y-4">
                    {district.seats.map((seat) => {
                      const key = `${district.district}__${seat.seat}`;
                      return (
                        <div key={key} className="rounded-2xl border border-slate-200 p-4">
                          <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                            <h3 className="text-lg font-semibold">{seat.seat}</h3>
                            <span className="text-xs text-slate-500">Choose one predicted winner</span>
                          </div>
                          <div className="grid gap-2 md:grid-cols-3">
                            {seat.candidates.map((candidate) => {
                              const selected = answers[key] === candidate;
                              return (
                                <label
                                  key={candidate}
                                  className={`cursor-pointer rounded-2xl border p-3 text-sm transition ${
                                    selected
                                      ? "border-slate-900 bg-slate-900 text-white"
                                      : "border-slate-300 bg-white hover:border-slate-500"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={key}
                                    className="hidden"
                                    checked={selected}
                                    onChange={() => updateAnswer(district.district, seat.seat, candidate)}
                                  />
                                  {candidate}
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))
            ) : (
              <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
                <h2 className="text-2xl font-semibold">Ready to vote?</h2>
                <p className="mt-3 text-slate-600">Enter your name above to begin predicting all 140 Kerala assembly seats.</p>
              </div>
            )}

            {started && (
              <div className="sticky bottom-4 z-10 rounded-3xl bg-white p-4 shadow-lg ring-1 ring-slate-200">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-semibold">Submit your predictions</div>
                    <div className="text-sm text-slate-600">You can resubmit later with the same name to update your picks.</div>
                  </div>
                  <button
                    onClick={submitPrediction}
                    className="rounded-2xl bg-slate-900 px-5 py-3 text-white transition hover:opacity-90"
                  >
                    Submit Predictions
                  </button>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-semibold">Friends</h2>
              <p className="mt-2 text-sm text-slate-600">Select up to 4 submissions to compare side by side.</p>
              <div className="mt-4 space-y-2">
                {submissions.length === 0 ? (
                  <p className="text-sm text-slate-500">No submissions yet.</p>
                ) : (
                  submissions.map((submission) => (
                    <label
                      key={submission.id}
                      className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 px-3 py-2"
                    >
                      <div>
                        <div className="font-medium">{submission.name}</div>
                        <div className="text-xs text-slate-500">{submission.submittedAt}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedFriends.includes(submission.name)}
                        onChange={() => toggleFriend(submission.name)}
                      />
                    </label>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-semibold">Comparison Table</h2>
              <p className="mt-2 text-sm text-slate-600">See how each friend predicted each seat.</p>
              <div className="mt-4 max-h-[75vh] overflow-auto rounded-2xl border border-slate-200">
                <table className="min-w-full border-collapse text-sm">
                  <thead className="sticky top-0 bg-slate-100">
                    <tr>
                      <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold">District</th>
                      <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold">Seat</th>
                      {visibleSubmissions.map((submission) => (
                        <th key={submission.id} className="border-b border-slate-200 px-3 py-2 text-left font-semibold">
                          {submission.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allSeats.map((row) => {
                      const key = `${row.district}__${row.seat}`;
                      return (
                        <tr key={key} className="align-top odd:bg-white even:bg-slate-50">
                          <td className="border-b border-slate-200 px-3 py-2">{row.district}</td>
                          <td className="border-b border-slate-200 px-3 py-2 font-medium">{row.seat}</td>
                          {visibleSubmissions.map((submission) => (
                            <td key={submission.id} className="border-b border-slate-200 px-3 py-2 text-slate-700">
                              {submission.answers[key] || "—"}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
