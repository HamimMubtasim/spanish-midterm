
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Home, Hand, Hash, HelpCircle, User, Users, Calendar, Users2, Zap,
  MousePointer, Globe, Clock, FileText, Key, ArrowLeftRight, Menu, X, ChevronDown
} from "lucide-react"

// Reusable Accordion for Rules
function RuleAccordion({ title, children }: { title: string, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full p-4 text-left font-semibold text-gray-800 hover:bg-gray-50"
            >
                <span>{title}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-4 pt-0 text-gray-600">
                    {children}
                </div>
            )}
        </div>
    )
}


export default function SpanishStudyGuide() {
  const [activeSection, setActiveSection] = useState("topic-welcome")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navigationItems = [
    { id: "topic-welcome", title: "Bienvenido", subtitle: "Welcome", icon: Home },
    { id: "topic-greetings", title: "Saludos", subtitle: "Greetings", icon: Hand },
    { id: "topic-numbers", title: "Números", subtitle: "Numbers", icon: Hash },
    { id: "topic-questions", title: "Preguntas", subtitle: "Questions", icon: HelpCircle },
    { id: "topic-introduce", title: "Presentarse", subtitle: "Introduce Yourself", icon: User },
    { id: "topic-describe", title: "Describir", subtitle: "Describe", icon: Users },
    { id: "topic-time-elements", title: "Días y Meses", subtitle: "Days & Months", icon: Calendar },
    { id: "topic-gender", title: "Género", subtitle: "Gender", icon: Users2 },
    { id: "topic-verbs", title: "Verbos", subtitle: "Verbs", icon: Zap },
    { id: "topic-demonstratives", title: "Demostrativos", subtitle: "Demonstratives", icon: MousePointer },
    { id: "topic-nationalities", title: "Nacionalidades", subtitle: "Nationalities", icon: Globe },
    { id: "topic-time", title: "La Hora", subtitle: "The Time", icon: Clock },
    { id: "topic-articles", title: "Artículos", subtitle: "Articles", icon: FileText },
    { id: "topic-possessives", title: "Posesivos", subtitle: "Possessives", icon: Key },
    { id: "topic-por-para", title: "Por y Para", subtitle: "Por & Para", icon: ArrowLeftRight },
  ]
  
  const handleNavigationClick = (id: string) => {
    setActiveSection(id);
    // Close sidebar on mobile after selection
    if (typeof window !== 'undefined' && window.innerWidth < 768) { // md breakpoint in Tailwind
        setIsSidebarOpen(false);
    }
  }

  return (
    <div className="relative md:flex h-screen bg-gray-50 overflow-hidden">
      {/* Overlay for mobile to close sidebar */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg flex-shrink-0 flex flex-col transition-transform duration-300 ease-in-out z-30 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="p-6 flex-shrink-0 flex justify-between items-center border-b">
            <div>
                <h1 className="text-2xl font-bold text-[#cd0000]">Guía de Examen</h1>
                <p className="text-sm text-gray-500 mt-1">Interactive Midterm</p>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-1 text-gray-500 hover:text-gray-800">
                <X className="w-6 h-6"/>
            </button>
        </div>
        <nav className="flex flex-col p-4 space-y-1 overflow-y-auto flex-1">
          {navigationItems.map((item) => {
            const IconComponent = item.icon
            return (
              <button
                key={item.id}
                onClick={() => handleNavigationClick(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition-all duration-200 w-full ${
                  activeSection === item.id ? "bg-[#cd0000] text-white shadow-md" : "text-gray-700 hover:bg-red-50"
                }`}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium">{item.title}</p>
                  <p className={`text-xs truncate ${activeSection === item.id ? "text-red-200" : "text-gray-500"}`}>
                    {item.subtitle}
                  </p>
                </div>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        <header className="p-4 md:hidden bg-white border-b flex items-center">
             <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-700">
                <Menu className="w-6 h-6"/>
            </button>
             <div className="flex-grow text-center">
                <h2 className="text-lg font-semibold text-gray-800">{navigationItems.find(i => i.id === activeSection)?.title}</h2>
             </div>
        </header>
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-gray-100">
          {activeSection === "topic-welcome" && <WelcomeSection handleNavigationClick={handleNavigationClick} />}
          {activeSection === "topic-greetings" && <GreetingsSection />}
          {activeSection === "topic-numbers" && <NumbersSection />}
          {activeSection === "topic-questions" && <QuestionsSection />}
          {activeSection === "topic-introduce" && <IntroduceSection />}
          {activeSection === "topic-describe" && <DescribeSection />}
          {activeSection === "topic-time-elements" && <TimeElementsSection />}
          {activeSection === "topic-gender" && <GenderSection />}
          {activeSection === "topic-verbs" && <VerbsSection />}
          {activeSection === "topic-demonstratives" && <DemonstrativesSection />}
          {activeSection === "topic-nationalities" && <NationalitiesSection />}
          {activeSection === "topic-time" && <TimeSection />}
          {activeSection === "topic-articles" && <ArticlesSection />}
          {activeSection === "topic-possessives" && <PossessivesSection />}
          {activeSection === "topic-por-para" && <PorParaSection />}
        </main>
      </div>
    </div>
  )
}

function WelcomeSection({ handleNavigationClick }: { handleNavigationClick: (id: string) => void }) {
  return (
    <div className="flex flex-col h-full">
        <div className="flex-grow">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Bienvenido a tu Guía Interactiva</h2>
          <p className="text-base md:text-lg mb-6 text-gray-700">
            This application is designed to help you prepare for your Spanish exam. Use the menu on the left (or the button below on mobile) to navigate between topics. Each section includes notes and interactive exercises to reinforce your learning. Good luck!
          </p>
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">
                ¿Cómo usar esta guía? <span className="font-normal text-gray-600">(How to use this guide?)</span>
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Selecciona un tema del menú de navegación.</li>
                <li>Lee las explicaciones y los ejemplos.</li>
                <li>Prueba los ejercicios interactivos para poner a prueba tus conocimientos.</li>
                <li>Revisa los temas tantas veces como necesites.</li>
              </ol>
            </CardContent>
          </Card>
          <div className="mt-6 md:hidden">
              <Button onClick={() => handleNavigationClick('topic-greetings')} className="w-full bg-[#cd0000] hover:bg-red-700 text-white py-3 text-lg font-semibold rounded-lg shadow-md">
                Start Preparing
            </Button>
          </div>
        </div>
        <footer className="text-center p-4 text-gray-500 text-sm mt-8">
            Developed by Hamim
        </footer>
    </div>
  )
}

function GreetingsSection() {
  const greetings = [
    { spanish: "Hola", english: "Hello" },
    { spanish: "Buenos días", english: "Good morning" },
    { spanish: "Buenas tardes", english: "Good afternoon" },
    { spanish: "Buenas noches", english: "Good evening / Good night" },
    { spanish: "¿Cómo estás?", english: "How are you? (informal)" },
    { spanish: "¿Cómo está usted?", english: "How are you? (formal)" },
    { spanish: "Estoy bien, gracias.", english: "I'm fine, thank you." },
    { spanish: "Mucho gusto", english: "Nice to meet you" },
    { spanish: "Adiós", english: "Goodbye" },
    { spanish: "Hasta luego", english: "See you later" },
  ]

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">1. Saludos (Greetings)</h2>
      <p className="mb-6">
        Common greetings and farewells in Spanish. They are the basis of any conversation.
      </p>
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 font-semibold">Español</th>
                  <th className="p-3 font-semibold">Inglés</th>
                </tr>
            	</thead>
            	<tbody>
            	  {greetings.map((greeting, index) => (
            	    <tr key={index} className="border-b hover:bg-gray-50">
            	      <td className="p-3 font-medium">{greeting.spanish}</td>
            	      <td className="p-3">{greeting.english}</td>
            	    </tr>
            	  ))}
            	</tbody>
          	</table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function NumbersSection() {
  const [currentNumber, setCurrentNumber] = useState<string>("")
  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] = useState("")
  const [feedbackColor, setFeedbackColor] = useState("")

  const numbers: Record<string, string> = {
    "1": "uno", "2": "dos", "3": "tres", "4": "cuatro", "5": "cinco",
    "6": "seis", "7": "siete", "8": "ocho", "9": "nueve", "10": "diez",
    "11": "once", "12": "doce", "13": "trece", "14": "catorce", "15": "quince",
    "16": "dieciséis", "17": "diecisiete", "18": "dieciocho", "19": "diecinueve", "20": "veinte",
    "21": "veintiuno", "22": "veintidós", "23": "veintitrés", "29": "veintinueve", "30": "treinta",
    "31": "treinta y uno", "40": "cuarenta", "45": "cuarenta y cinco", "50": "cincuenta",
    "60": "sesenta", "70": "setenta", "88": "ochenta y ocho", "99": "noventa y nueve", "100": "cien",
  }

  const newQuestion = () => {
    const numberKeys = Object.keys(numbers)
    const randomNumber = numberKeys[Math.floor(Math.random() * numberKeys.length)]
    setCurrentNumber(randomNumber)
    setUserAnswer("")
    setFeedback("")
  }

  const checkAnswer = () => {
    const trimmedAnswer = userAnswer.trim().toLowerCase()
    if (trimmedAnswer === numbers[currentNumber]) {
      setFeedback("¡Correcto! (Correct!)")
      setFeedbackColor("text-green-600")
    } else {
      setFeedback(`Incorrecto. La respuesta es "${numbers[currentNumber]}". (Incorrect. The answer is...)`)
      setFeedbackColor("text-red-600")
    }
    setTimeout(newQuestion, 2000)
  }

  useEffect(() => { newQuestion() }, [])

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">2. Números (1-100)</h2>
      <p className="mb-6">
        Practice numbers from 1 to 100. Test your knowledge with this quick quiz.
      </p>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4">
            Prueba de Números <span className="font-normal text-gray-600">(Number Quiz)</span>
          </h3>
          <div className="text-center mb-4">
            <p className="text-base md:text-lg">
            	Escribe el número en español: (Write the number in Spanish:)
            </p>
            <p className="text-3xl md:text-4xl font-bold my-4">{currentNumber}</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
            <Input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
              className="w-full max-w-xs"
              placeholder="Tu respuesta... (Your answer...)"
            />
            <Button onClick={checkAnswer} className="w-full sm:w-auto">
              Revisar <span className="hidden sm:inline">(Check)</span>
            </Button>
          </div>
          <div className={`mt-4 text-center font-medium h-6 ${feedbackColor}`}>{feedback}</div>
        </CardContent>
      </Card>
    </div>
  )
}

function QuestionsSection() {
  const questions = [
    { spanish: "¿Qué?", english: "What?" },
    { spanish: "¿Quién(es)?", english: "Who?" },
    { spanish: "¿Cuándo?", english: "When?" },
    { spanish: "¿Dónde?", english: "Where?" },
    { spanish: "¿Por qué?", english: "Why?" },
    { spanish: "¿Cómo?", english: "How?" },
    { spanish: "¿Cuál(es)?", english: "Which?" },
    { spanish: "¿Cuánto/a(s)?", english: "How much / many?" },
  ]

  return (
  	<div>
  	  <h2 className="text-2xl md:text-3xl font-bold mb-4">3. Preguntas Básicas (Basic Questions)</h2>
  	  <p className="mb-6">Question words are essential for getting information. Learn them here.</p>
  	  <Card>
  	    <CardContent className="p-6">
  	      <div className="overflow-x-auto">
    	        <table className="w-full text-left">
  	          <thead>
  	            <tr className="border-b bg-gray-50">
  	              <th className="p-3 font-semibold">Español</th>
  	              <th className="p-3 font-semibold">Inglés</th>
  	            </tr>
  	          </thead>
  	          <tbody>
  	            {questions.map((question, index) => (
  	              <tr key={index} className="border-b hover:bg-gray-50">
  	                <td className="p-3 font-medium">{question.spanish}</td>
  	                <td className="p-3">{question.english}</td>
  	              </tr>
  	            ))}
  	          </tbody>
  	        </table>
  	      </div>
  	    </CardContent>
  	  </Card>
  	</div>
  )
}

function IntroduceSection() {
  const [name, setName] = useState("Hamim Mubtasim")
  const [age, setAge] = useState("24")
  const [country, setCountry] = useState("Bangladesh")
  const [city, setCity] = useState("Dhaka")
  const [birthday, setBirthday] = useState("el treinta de abril");
  const [hobby, setHobby] = useState("leer");
  const [favoriteColor, setFavoriteColor] = useState("azul");

  const introductionLines = [
    { spanish: `Hola, me llamo ${name}.`, english: `Hello, my name is ${name}.`},
    { spanish: `Tengo ${age} años.`, english: `I am ${age} years old.`},
    { spanish: `Soy de ${country}.`, english: `I am from ${country}.`},
    { spanish: `Vivo en ${city}.`, english: `I live in ${city}.`},
    { spanish: "Soy estudiante en la Universidad de Dhaka.", english: "I am a student at the University of Dhaka."},
    { spanish: "Estudio Administración de Empresas.", english: "I study Business Administration."},
    { spanish: `Mi cumpleaños es ${birthday}.`, english: `My birthday is ${birthday}.` },
    { spanish: `En mi tiempo libre, me gusta ${hobby}.`, english: `In my free time, I like to ${hobby}.` },
    { spanish: `Mi color favorito es el ${favoriteColor}.`, english: `My favorite color is ${favoriteColor}.` },
    { spanish: "Mucho gusto en conocerte.", english: "It's a pleasure to meet you." }
  ]

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">4. Presentarse (Introduce Yourself)</h2>
      <p className="mb-6">Usa esta plantilla para crear tu propia presentación en español.</p>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Tus Detalles (Your Details)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div><Label>Nombre (Name)</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div><Label>Edad (Age)</Label><Input type="number" value={age} onChange={(e) => setAge(e.target.value)} /></div>
            <div><Label>País (Country)</Label><Input value={country} onChange={(e) => setCountry(e.target.value)} /></div>
            <div><Label>Ciudad (City)</Label><Input value={city} onChange={(e) => setCity(e.target.value)} /></div>
            <div><Label>Cumpleaños (Birthday, e.g., "el diez de mayo")</Label><Input value={birthday} onChange={(e) => setBirthday(e.target.value)} /></div>
            <div><Label>Pasatiempo (Hobby, e.g., "leer")</Label><Input value={hobby} onChange={(e) => setHobby(e.target.value)} /></div>
            <div className="md:col-span-2"><Label>Color Favorito (Favorite Color, e.g., "azul")</Label><Input value={favoriteColor} onChange={(e) => setFavoriteColor(e.target.value)} /></div>
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">Tu Presentación (Your Introduction)</h3>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2 border">
            {introductionLines.map((line, index) => (
              <p key={index}><span className="font-medium">{line.spanish}</span> <span className="text-gray-500">{line.english}</span></p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DescribeSection() {
    const [friendName, setFriendName] = useState("Carlos");
    const [friendOrigin, setFriendOrigin] = useState("México");
    const [friendAge, setFriendAge] = useState("20");
    const [adj1, setAdj1] = useState("inteligente");
    const [adj2, setAdj2] = useState("divertido");
    const [hobby, setHobby] = useState("jugar al fútbol");

    const descriptionLines = [
        { spanish: `Este es mi amigo, ${friendName}.`, english: `This is my friend, ${friendName}.`},
        { spanish: `Él es de ${friendOrigin}.`, english: `He is from ${friendOrigin}.`},
        { spanish: `Él tiene ${friendAge} años.`, english: `He is ${friendAge} years old.`},
        { spanish: `${friendName} es muy ${adj1} y ${adj2}.`, english: `${friendName} is very ${adj1} and ${adj2}.`},
        { spanish: `A él le gusta ${hobby}.`, english: `He likes to ${hobby}.`},
        { spanish: "Nosotros somos buenos amigos.", english: "We are good friends."},
    ];

    return (
        <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">5. Describir a un Amigo (Describe a Friend)</h2>
            <p className="mb-6">Usa esta plantilla para describir a un amigo.</p>
            <Card>
                <CardContent className="p-6">
                    <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Detalles del Amigo (Friend's Details)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div><Label>Nombre del Amigo (Friend's Name)</Label><Input value={friendName} onChange={(e) => setFriendName(e.target.value)} /></div>
                        <div><Label>Edad (Age)</Label><Input value={friendAge} onChange={(e) => setFriendAge(e.target.value)} /></div>
                        <div><Label>Origen (Origin, e.g., "México")</Label><Input value={friendOrigin} onChange={(e) => setFriendOrigin(e.target.value)} /></div>
                        <div><Label>Pasatiempo (Hobby, e.g., "jugar al fútbol")</Label><Input value={hobby} onChange={(e) => setHobby(e.target.value)} /></div>
                        <div><Label>Adjetivo 1 (e.g., "inteligente")</Label><Input value={adj1} onChange={(e) => setAdj1(e.target.value)} /></div>
                        <div><Label>Adjetivo 2 (e.g., "divertido")</Label><Input value={adj2} onChange={(e) => setAdj2(e.target.value)} /></div>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2">Tu Descripción (Your Description)</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 border">
                        {descriptionLines.map((line, index) => (
                             <p key={index}><span className="font-medium">{line.spanish}</span> <span className="text-gray-500">{line.english}</span></p>
                        ))}
                    </div>
                     <p className="mt-4 text-sm text-gray-500">
                        Nota: Los adjetivos concuerdan en género y número con el sustantivo. (Note: Adjectives agree in gender and number with the noun.)
                     </p>
                </CardContent>
            </Card>
        </div>
    )
}

function TimeElementsSection() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())

  const flashcardData = [
    // Days of the week
    { front: "Monday", back: "lunes" }, { front: "Tuesday", back: "martes" },
    { front: "Wednesday", back: "miércoles" }, { front: "Thursday", back: "jueves" },
    { front: "Friday", back: "viernes" }, { front: "Saturday", back: "sábado" },
    { front: "Sunday", back: "domingo" },
    // Months of the year
    { front: "January", back: "enero" }, { front: "February", back: "febrero" },
    { front: "March", back: "marzo" }, { front: "April", back: "abril" },
    { front: "May", back: "mayo" }, { front: "June", back: "junio" },
    { front: "July", back: "julio" }, { front: "August", back: "agosto" },
    { front: "September", back: "septiembre" }, { front: "October", back: "octubre" },
    { front: "November", back: "noviembre" }, { front: "December", back: "diciembre" },
    // Seasons
    { front: "Spring", back: "la primavera" }, { front: "Summer", back: "el verano" },
    { front: "Autumn", back: "el otoño" }, { front: "Winter", back: "el invierno" },
  ]

  const toggleCard = (index: number) => {
  	const newFlipped = new Set(flippedCards)
  	if (newFlipped.has(index)) { newFlipped.delete(index) } else { newFlipped.add(index) }
  	setFlippedCards(newFlipped)
  }

  return (
  	<div>
  	  <h2 className="text-2xl md:text-3xl font-bold mb-4">6. Días, Meses y Estaciones</h2>
  	  <p className="mb-6">
  	    Learn vocabulary for time. Click the cards to reveal the translation. Note: days and months in Spanish are not capitalized.
  	  </p>
  	  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
  	    {flashcardData.map((card, index) => (
  	      <div
  	        key={index}
  	        onClick={() => toggleCard(index)}
  	        className={`h-32 rounded-lg shadow flex items-center justify-center p-4 text-lg md:text-xl font-bold cursor-pointer text-center transition-all duration-200 ${
  	          flippedCards.has(index) ? "bg-red-100 transform -scale-y-100" : "bg-white hover:bg-gray-50"
  	        }`}
  	      >
  	        <div className={`transition-opacity duration-200 ${flippedCards.has(index) ? 'transform -scale-y-100' : ''}`}>
                 {flippedCards.has(index) ? card.back : card.front}
            </div>
  	      </div>
  	    ))}
  	  </div>
  	</div>
  )
}

function GenderSection() {
  const [currentWord, setCurrentWord] = useState<{ word: string; gender: string }>({ word: "", gender: "" })
  const [feedback, setFeedback] = useState("")
  const [feedbackColor, setFeedbackColor] = useState("")

  const words = [
  	{ word: "libro", gender: "m" }, { word: "casa", gender: "f" },
  	{ word: "problema", gender: "m" }, { word: "ciudad", gender: "f" },
  	{ word: "mapa", gender: "m" }, { word: "mano", gender: "f" },
  	{ word: "canción", gender: "f" }, { word: "día", gender: "m" },
  	{ word: "luz", gender: "f" },
  ]

  const newQuestion = () => {
  	const randomWord = words[Math.floor(Math.random() * words.length)]
  	setCurrentWord(randomWord)
  	setFeedback("")
  }

  const checkAnswer = (chosenGender: string) => {
  	if (chosenGender === currentWord.gender) {
  	  setFeedback("¡Correcto! (Correct!)")
  	  setFeedbackColor("text-green-600")
  	} else {
  	  setFeedback(`Incorrecto. Es ${currentWord.gender === "m" ? "'el'" : "'la'"} ${currentWord.word}.`)
  	  setFeedbackColor("text-red-600")
  	}
  	setTimeout(newQuestion, 1500)
  }

  useEffect(() => { newQuestion() }, [])

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">7 & 8. Género (Gender)</h2>
      <p className="mb-6">Todos los sustantivos en español tienen género, masculino o femenino.</p>
      <Card className="mb-6 shadow-sm">
        <CardContent className="p-0">
            <h3 className="p-4 text-lg font-semibold border-b">Reglas para Recordar</h3>
            <RuleAccordion title="Sustantivos Masculinos (-o, -ma, -pa, -ta)">
                <ul className="list-disc list-inside space-y-1">
                    <li>Generalmente, las palabras que terminan en <strong>-o</strong> son masculinas (<em>el libro</em>).</li>
                    <li>Palabras de origen griego que terminan en <strong>-ma, -pa, -ta</strong> son masculinas (<em>el problema, el mapa</em>).</li>
                    <li>Días de la semana y meses son masculinos.</li>
                </ul>
            </RuleAccordion>
            <RuleAccordion title="Sustantivos Femeninos (-a, -ción, -sión, -dad, -tad, -tud)">
                 <ul className="list-disc list-inside space-y-1">
                    <li>Generalmente, las palabras que terminan en <strong>-a</strong> son femeninas (<em>la casa</em>).</li>
                    <li>Palabras que terminan en <strong>-ción, -sión, -dad, -tad, -tud</strong> son femeninas (<em>la canción, la ciudad</em>).</li>
                </ul>
            </RuleAccordion>
             <RuleAccordion title="Excepciones Importantes">
                 <ul className="list-disc list-inside space-y-1">
                    <li><strong>el día</strong> (the day)</li>
                    <li><strong>la mano</strong> (the hand)</li>
                    <li><strong>el agua</strong> (the water - uses 'el' for pronunciation, but is feminine)</li>
                </ul>
            </RuleAccordion>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Prueba de Género (Gender Quiz)</h3>
          <p className="text-base md:text-lg text-center mb-4">
          	¿Cuál es el artículo correcto para <strong className="text-[#cd0000]">{currentWord.word}</strong>?
          	<span className="block text-gray-600">(What is the correct article for...?)</span>
          </p>
          <div className="flex justify-center gap-4">
          	<Button onClick={() => checkAnswer("m")} className="bg-blue-200 text-blue-800 font-bold py-3 px-6 text-xl md:text-2xl hover:bg-blue-300">el</Button>
          	<Button onClick={() => checkAnswer("f")} className="bg-pink-200 text-pink-800 font-bold py-3 px-6 text-xl md:text-2xl hover:bg-pink-300">la</Button>
          </div>
          <div className={`mt-4 text-center font-medium h-6 ${feedbackColor}`}>{feedback}</div>
        </CardContent>
      </Card>
    </div>
  )
}

function VerbsSection() {
  const [selectedVerb, setSelectedVerb] = useState("ser")

  const verbs: Record<string, Record<string, string>> = {
  	ser: { yo: "soy", tú: "eres", él: "es", nosotros: "somos", vosotros: "sois", ellos: "son" },
  	estar: { yo: "estoy", tú: "estás", él: "está", nosotros: "estamos", vosotros: "estáis", ellos: "están" },
  	tener: { yo: "tengo", tú: "tienes", él: "tiene", nosotros: "tenemos", vosotros: "tenéis", ellos: "tienen" },
  	ir: { yo: "voy", tú: "vas", él: "va", nosotros: "vamos", vosotros: "vais", ellos: "van" },
  	hablar: { yo: "hablo", tú: "hablas", él: "habla", nosotros: "hablamos", vosotros: "habláis", ellos: "hablan" },
  	comer: { yo: "como", tú: "comes", él: "come", nosotros: "comemos", vosotros: "coméis", ellos: "comen" },
  }

  const pronouns = [
  	{ spanish: "Yo", conjugation: "yo" }, { spanish: "Tú", conjugation: "tú" },
  	{ spanish: "Él/Ella/Usted", conjugation: "él" }, { spanish: "Nosotros/as", conjugation: "nosotros" },
  	{ spanish: "Vosotros/as", conjugation: "vosotros" }, { spanish: "Ellos/as/Ustedes", conjugation: "ellos" },
  ]

  return (
  	<div>
  	  <h2 className="text-2xl md:text-3xl font-bold mb-4">9. Verbos Importantes (Important Verbs)</h2>
  	  <p className="mb-6">Explore the conjugations of the most common verbs. Select a verb to see its conjugation table.</p>
  	  <Card>
  	    <CardContent className="p-6">
  	      <div className="mb-4">
  	        <Label>Selecciona un verbo: <span className="text-gray-600">(Select a verb:)</span></Label>
  	        <Select value={selectedVerb} onValueChange={setSelectedVerb}>
  	          <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
  	          <SelectContent>
  	            {Object.keys(verbs).map((verb) => (
    	              <SelectItem key={verb} value={verb}>
  	                {verb.charAt(0).toUpperCase() + verb.slice(1)}
  	              </SelectItem>
  	            ))}
  	          </SelectContent>
  	        </Select>
  	      </div>
  	      <div className="overflow-x-auto">
  	        <table className="w-full text-left">
  	          <thead>
  	            <tr className="border-b bg-gray-50">
  	              <th className="p-3 font-semibold">Pronombre (Pronoun)</th>
  	              <th className="p-3 font-semibold">Conjugación (Conjugation)</th>
  	            </tr>
  	          </thead>
  	          <tbody>
  	            {pronouns.map((pronoun, index) => (
  	              <tr key={index} className="border-b hover:bg-gray-50">
  	                <td className="p-3">{pronoun.spanish}</td>
  	                <td className="p-3 font-medium">{verbs[selectedVerb][pronoun.conjugation]}</td>
  	              </tr>
  	            ))}
  	          </tbody>
  	        </table>
  	      </div>
  	    </CardContent>
  	  </Card>
  	</div>
  )
}

function DemonstrativesSection() {
  const [currentQuestion, setCurrentQuestion] = useState<{ sentence: string; options: string[]; answer: string }>({ sentence: "", options: [], answer: "" })
  const [feedback, setFeedback] = useState("")
  const [feedbackColor, setFeedbackColor] = useState("")

  const questions = [
  	{ sentence: "Quiero ___ libro aquí.", options: ["este", "ese", "aquel"], answer: "este" },
  	{ sentence: "¿Ves ___ pájaro allí?", options: ["este", "ese", "aquel"], answer: "aquel" },
  	{ sentence: "Pásame ___ silla ahí.", options: ["esta", "esa", "aquella"], answer: "esa" },
  	{ sentence: "Me gustan ___ zapatos aquí.", options: ["estos", "esos", "aquellos"], answer: "estos" },
  ]

  const newQuestion = () => {
  	const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
  	setCurrentQuestion(randomQuestion)
  	setFeedback("")
  }

  const checkAnswer = (choice: string) => {
  	if (choice === currentQuestion.answer) {
  	  setFeedback("¡Correcto! (Correct!)")
  	  setFeedbackColor("text-green-600")
  	} else {
  	  setFeedback(`Incorrecto. La respuesta es "${currentQuestion.answer}".`)
  	  setFeedbackColor("text-red-600")
  	}
  	setTimeout(newQuestion, 1500)
  }

  useEffect(() => { newQuestion() }, [])
  
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">10. Adjetivos Demostrativos</h2>
      <p className="mb-6">Los demostrativos indican la distancia de un objeto o persona en relación con el hablante.</p>
       <Card className="mb-6 shadow-sm">
        <CardContent className="p-0">
            <h3 className="p-4 text-lg font-semibold border-b">Distancias y Formas</h3>
             <RuleAccordion title="Aquí (Close to speaker)">
                <p>Use <strong>este / esta / estos / estas</strong> for things right here.</p>
                <p className="mt-2"><em>Ejemplo: Me gusta <strong>este</strong> libro. (I like this book.)</em></p>
            </RuleAccordion>
            <RuleAccordion title="Ahí (Not so close)">
                <p>Use <strong>ese / esa / esos / esas</strong> for things over there, near the listener.</p>
                 <p className="mt-2"><em>Ejemplo: Pásame <strong>esa</strong> silla. (Pass me that chair.)</em></p>
            </RuleAccordion>
            <RuleAccordion title="Allí (Far from both)">
                <p>Use <strong>aquel / aquella / aquellos / aquellas</strong> for things way over there, far from everyone.</p>
                <p className="mt-2"><em>Ejemplo: ¿Ves <strong>aquel</strong> edificio? (Do you see that building way over there?)</em></p>
            </RuleAccordion>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Prueba de Demostrativos</h3>
          <div className="text-base md:text-lg text-center mb-4">{currentQuestion.sentence.replace("___", "___")}</div>
          <div className="flex justify-center flex-wrap gap-4">
            {currentQuestion.options.map((option, index) => (
              <Button key={index} onClick={() => checkAnswer(option)} className="bg-gray-200 text-gray-800 font-medium py-2 px-4 hover:bg-gray-300">{option}</Button>
            ))}
          </div>
          <div className={`mt-4 text-center font-medium h-6 ${feedbackColor}`}>{feedback}</div>
        </CardContent>
      </Card>
    </div>
  )
}

function NationalitiesSection() {
    const nationalities = [
        { country: "Afganistán", masculine: "afgano", feminine: "afgana" },
        { country: "Alemania", masculine: "alemán", feminine: "alemana" },
        { country: "Argentina", masculine: "argentino", feminine: "argentina" },
        { country: "Australia", masculine: "australiano", feminine: "australiana" },
        { country: "Bangladesh", masculine: "bangladesí", feminine: "bangladesí" },
        { country: "Bélgica", masculine: "belga", feminine: "belga" },
        { country: "Brasil", masculine: "brasileño", feminine: "brasileña" },
        { country: "Canadá", masculine: "canadiense", feminine: "canadiense" },
        { country: "Chile", masculine: "chileno", feminine: "chilena" },
        { country: "China", masculine: "chino", feminine: "china" },
        { country: "Colombia", masculine: "colombiano", feminine: "colombiana" },
        { country: "España", masculine: "español", feminine: "española" },
        { country: "Estados Unidos", masculine: "estadounidense", feminine: "estadounidense" },
        { country: "Francia", masculine: "francés", feminine: "francesa" },
        { country: "India", masculine: "indio", feminine: "india" },
        { country: "Italia", masculine: "italiano", feminine: "italiana" },
        { country: "Japón", masculine: "japonés", feminine: "japonesa" },
        { country: "México", masculine: "mexicano", feminine: "mexicana" },
        { country: "Rusia", masculine: "ruso", feminine: "rusa" },
    ]

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">11. Nacionalidades (Nationalities)</h2>
      <p className="mb-6">
      	Nationalities are adjectives and must agree in gender. Some are the same for both genders.
      </p>
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 font-semibold">País (Country)</th>
                  <th className="p-3 font-semibold">Masculino</th>
                  <th className="p-3 font-semibold">Femenino</th>
                </tr>
            	</thead>
            	<tbody>
            	  {nationalities.map((nationality, index) => (
            	    <tr key={index} className="border-b hover:bg-gray-50">
            	      <td className="p-3">{nationality.country}</td>
            	      <td className="p-3">{nationality.masculine}</td>
            	      <td className="p-3">{nationality.feminine}</td>
            	    </tr>
            	  ))}
            	</tbody>
          	</table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TimeSection() {
  const [currentTime, setCurrentTime] = useState({ hour: 0, minute: 0 })
  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] = useState("")
  const [feedbackColor, setFeedbackColor] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")

  const numberToWord: { [key: number]: string } = {1: "una", 2: "dos", 3: "tres", 4: "cuatro", 5: "cinco", 6: "seis", 7: "siete", 8: "ocho", 9: "nueve", 10: "diez", 11: "once", 12: "doce", 13: "trece", 14: "catorce", 15: "quince", 20: "veinte", 25: "veinticinco" };

  const getSpanishTime = (hour: number, minute: number): string => {
    let displayHour = hour % 12;
    if (displayHour === 0) displayHour = 12;

    if (minute === 0) return displayHour === 1 ? "es la una en punto" : `son las ${numberToWord[displayHour]} en punto`;
    if (minute === 15) return displayHour === 1 ? "es la una y cuarto" : `son las ${numberToWord[displayHour]} y cuarto`;
    if (minute === 30) return displayHour === 1 ? "es la una y media" : `son las ${numberToWord[displayHour]} y media`;
    if (minute < 30) return displayHour === 1 ? `es la una y ${minute}` : `son las ${numberToWord[displayHour]} y ${minute}`;
    
    const nextHour = (displayHour % 12) + 1;
    const minutesLeft = 60 - minute;
    if (minutesLeft === 15) return nextHour === 1 ? "es la una menos cuarto" : `son las ${numberToWord[nextHour] || nextHour} menos cuarto`;
    return nextHour === 1 ? `es la una menos ${minutesLeft}` : `son las ${numberToWord[nextHour] || nextHour} menos ${minutesLeft}`;
  }

  const newQuestion = () => {
  	const hour = Math.floor(Math.random() * 12) + 1
  	const minute = Math.floor(Math.random() * 60)
  	setCurrentTime({ hour, minute })
  	const answer = getSpanishTime(hour, minute).toLowerCase()
  	setCorrectAnswer(answer)
  	setUserAnswer("")
  	setFeedback("")
  }

  const checkAnswer = () => {
  	const trimmedAnswer = userAnswer.trim().toLowerCase().replace(/\.$/, "")
  	if (trimmedAnswer === correctAnswer) {
  	  setFeedback("¡Correcto! (Correct!)")
  	  setFeedbackColor("text-green-600")
  	} else {
  	  setFeedback(`Casi... La respuesta correcta es "${correctAnswer}".`)
  	  setFeedbackColor("text-red-600")
  	}
  	setTimeout(newQuestion, 2500)
  }

  useEffect(() => { newQuestion() }, [])

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">12. ¿Qué hora es? (What time is it?)</h2>
      <p className="mb-6">Decir la hora en español tiene reglas específicas.</p>
      <Card className="mb-6 shadow-sm">
        <CardContent className="p-0">
            <h3 className="p-4 text-lg font-semibold border-b">Reglas para Decir la Hora</h3>
             <RuleAccordion title="Ser + La/Las">
                <p>Usa <strong>Es la</strong> para la una (1:00). Usa <strong>Son las</strong> para todas las demás horas.</p>
                <p className="mt-2"><em>Ejemplos: <strong>Es la</strong> una. <strong>Son las</strong> tres.</em></p>
            </RuleAccordion>
            <RuleAccordion title="Minutos (1-30)">
                <p>Usa <strong>y</strong> para añadir minutos. 15 minutos es <strong>y cuarto</strong>. 30 minutos es <strong>y media</strong>.</p>
                <p className="mt-2"><em>Ejemplos: Son las dos <strong>y diez</strong>. Es la una <strong>y cuarto</strong>. Son las cinco <strong>y media</strong>.</em></p>
            </RuleAccordion>
            <RuleAccordion title="Minutos (31-59)">
                <p>Di la próxima hora y resta los minutos que faltan con <strong>menos</strong>. 45 minutos es <strong>menos cuarto</strong>.</p>
                <p className="mt-2"><em>Ejemplos: Son las tres <strong>menos</strong> veinte (2:40). Son las diez <strong>menos cuarto</strong> (9:45).</em></p>
            </RuleAccordion>
        </CardContent>
      </Card>
       <Card>
        <CardContent className="p-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Prueba de la Hora (Time Quiz)</h3>
          <p className="text-base md:text-lg text-center mb-2">Escribe la hora que se muestra: (Write the time shown:)</p>
          <div className="text-5xl md:text-6xl font-bold text-center my-4 text-[#cd0000]">
          	{currentTime.hour.toString().padStart(2, "0")}:{currentTime.minute.toString().padStart(2, "0")}
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
          	<Input
          	  type="text"
          	  value={userAnswer}
          	  onChange={(e) => setUserAnswer(e.target.value)}
          	  onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
          	  className="w-full max-w-md"
          	  placeholder="Ej: Son las dos y media"
          	/>
          	<Button onClick={checkAnswer} className="w-full sm:w-auto mt-2 sm:mt-0">
          	  Revisar <span className="hidden sm:inline">(Check)</span>
          	</Button>
          </div>
          <div className={`mt-4 text-center font-medium h-6 ${feedbackColor}`}>{feedback}</div>
        </CardContent>
      </Card>
    </div>
  )
}

function ArticlesSection() {
  const [currentWord, setCurrentWord] = useState<{ word: string; def: string; indef: string }>({ word: "", def: "", indef: "" })
  const [feedback, setFeedback] = useState("")
  const [feedbackColor, setFeedbackColor] = useState("")
  const words = [
  	{ word: "coche", def: "el", indef: "un" },
  	{ word: "chica", def: "la", indef: "una" },
  	{ word: "libros", def: "los", indef: "unos" },
  	{ word: "casas", def: "las", indef: "unas" },
  ]
  const newQuestion = () => {
  	const randomWord = words[Math.floor(Math.random() * words.length)]
  	setCurrentWord(randomWord)
  	setFeedback("")
  }
  const checkAnswer = (choice: string, correctAnswer: string) => {
  	if (choice === correctAnswer) {
  	  setFeedback("¡Correcto! (Correct!)")
  	  setFeedbackColor("text-green-600")
  	} else {
  	  setFeedback(`Incorrecto. La opción correcta era "${correctAnswer}".`)
  	  setFeedbackColor("text-red-600")
  	}
  	setTimeout(newQuestion, 1500)
  }
  useEffect(() => { newQuestion() }, [])
  const isPlural = currentWord.word.endsWith('s');
  const defOptions = isPlural ? ["los", "las"] : ["el", "la"]
  const indefOptions = isPlural ? ["unos", "unas"] : ["un", "una"]

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">13. Artículos (Articles)</h2>
      <p className="mb-6">Los artículos deben concordar en género y número con el sustantivo.</p>
      <Card className="mb-6 shadow-sm">
        <CardContent className="p-0">
            <h3 className="p-4 text-lg font-semibold border-b">Tipos de Artículos</h3>
            <RuleAccordion title="Artículos Definidos (The)">
                <ul className="list-disc list-inside">
                    <li><strong>el</strong> (masculine, singular): <em>el libro</em></li>
                    <li><strong>la</strong> (feminine, singular): <em>la mesa</em></li>
                    <li><strong>los</strong> (masculine, plural): <em>los libros</em></li>
                    <li><strong>las</strong> (feminine, plural): <em>las mesas</em></li>
                </ul>
            </RuleAccordion>
            <RuleAccordion title="Artículos Indefinidos (A, An, Some)">
                 <ul className="list-disc list-inside">
                    <li><strong>un</strong> (masculine, singular): <em>un libro</em></li>
                    <li><strong>una</strong> (feminine, singular): <em>una mesa</em></li>
                    <li><strong>unos</strong> (masculine, plural): <em>unos libros</em></li>
                    <li><strong>unas</strong> (feminine, plural): <em>unas mesas</em></li>
                </ul>
            </RuleAccordion>
        </CardContent>
      </Card>
      	<Card>
    	  <CardContent className="p-6">
    	    <h3 className="text-lg md:text-xl font-semibold mb-4">Prueba de Artículos (Articles Quiz)</h3>
    	    <p className="text-base md:text-lg text-center mb-4">
    	      Completa con los artículos correctos para <strong className="text-[#cd0000]">{currentWord.word}</strong>.
    	    </p>
    	    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
    	      <div className="text-center">
    	        <p className="font-medium mb-2">Definido ("the")</p>
    	        <div className="flex justify-center gap-2">
    	          {defOptions.map((option) => (
    	            <Button key={option} onClick={() => checkAnswer(option, currentWord.def)} className="bg-gray-200 text-gray-800 font-medium py-2 px-4 hover:bg-gray-300">{option}</Button>
    	          ))}
    	        </div>
    	      </div>
    	      <div className="text-center">
    	        <p className="font-medium mb-2">Indefinido ("a/some")</p>
    	        <div className="flex justify-center gap-2">
    	          {indefOptions.map((option) => (
    	             <Button key={option} onClick={() => checkAnswer(option, currentWord.indef)} className="bg-gray-200 text-gray-800 font-medium py-2 px-4 hover:bg-gray-300">{option}</Button>
    	          ))}
    	        </div>
    	      </div>
    	    </div>
    	    <div className={`mt-4 text-center font-medium h-6 ${feedbackColor}`}>{feedback}</div>
    	  </CardContent>
    	</Card>
    </div>
  )
}

function PossessivesSection() {
  const [currentQuestion, setCurrentQuestion] = useState<{ owner: string; item: string; options: string[]; answer: string }>({ owner: "", item: "", options: [], answer: "" })
  const [feedback, setFeedback] = useState("")
  const [feedbackColor, setFeedbackColor] = useState("")

  const questions = [
  	{ owner: "Yo", item: "libro", options: ["mi", "mis", "tu"], answer: "mi" },
  	{ owner: "Tú", item: "amigos", options: ["tu", "tus", "su"], answer: "tus" },
  	{ owner: "Nosotros", item: "casa", options: ["nuestro", "nuestra", "sus"], answer: "nuestra" },
  	{ owner: "Ellos", item: "perros", options: ["sus", "su", "nuestros"], answer: "sus" },
  ]
  const newQuestion = () => {
  	const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
  	setCurrentQuestion(randomQuestion)
  	setFeedback("")
  }
  const checkAnswer = (choice: string) => {
  	if (choice === currentQuestion.answer) {
  	  setFeedback("¡Correcto! (Correct!)")
  	  setFeedbackColor("text-green-600")
  	} else {
  	  setFeedback(`Incorrecto. La respuesta es "${currentQuestion.answer}".`)
  	  setFeedbackColor("text-red-600")
  	}
  	setTimeout(newQuestion, 1500)
  }
  useEffect(() => { newQuestion() }, [])

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">14. Adjetivos Posesivos</h2>
      <p className="mb-6">Los posesivos indican a quién pertenece algo y concuerdan con la cosa poseída, no con el dueño.</p>
       <Card className="mb-6 shadow-sm">
        <CardContent className="p-0">
            <h3 className="p-4 text-lg font-semibold border-b">Formas Posesivas</h3>
             <RuleAccordion title="Mi / Mis (My)">
                <p><strong>mi</strong> libro (singular), <strong>mis</strong> libros (plural)</p>
            </RuleAccordion>
             <RuleAccordion title="Tu / Tus (Your - informal)">
                <p><strong>tu</strong> casa (singular), <strong>tus</strong> casas (plural)</p>
            </RuleAccordion>
             <RuleAccordion title="Su / Sus (His, Her, Your-formal, Their)">
                <p><strong>su</strong> perro (singular), <strong>sus</strong> perros (plural)</p>
            </RuleAccordion>
             <RuleAccordion title="Nuestro / Nuestra / Nuestros / Nuestras (Our)">
                <p>Concuerda en género y número: <strong>nuestro</strong> coche, <strong>nuestra</strong> familia, <strong>nuestros</strong> amigos, <strong>nuestras</strong> amigas.</p>
            </RuleAccordion>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Prueba de Posesivos (Possessives Quiz)</h3>
          <div className="text-base md:text-lg text-center mb-4">
          	___ {currentQuestion.item} ({currentQuestion.owner})
          </div>
          <div className="flex justify-center flex-wrap gap-4">
            {currentQuestion.options.map((option) => (
              <Button key={option} onClick={() => checkAnswer(option)} className="bg-gray-200 text-gray-800 font-medium py-2 px-4 hover:bg-gray-300">{option}</Button>
            ))}
          </div>
          <div className={`mt-4 text-center font-medium h-6 ${feedbackColor}`}>{feedback}</div>
        </CardContent>
      </Card>
    </div>
  )
}

function PorParaSection() {
  const [currentSentence, setCurrentSentence] = useState<{ sentence: string; correct: string; explanation: string }>({ sentence: "", correct: "", explanation: "" })
  const [feedback, setFeedback] = useState("")
  const [feedbackColor, setFeedbackColor] = useState("")

  const sentences = [
    { sentence: "Camino ___ el parque.", correct: "por", explanation: "Movement through a place" },
    { sentence: "Este regalo es ___ ti.", correct: "para", explanation: "Recipient/destination" },
    { sentence: "Trabajo ___ mi familia.", correct: "para", explanation: "Purpose/goal" },
    { sentence: "Voy ___ la mañana.", correct: "por", explanation: "Time period (general)" },
    { sentence: "Estudio ___ ser médico.", correct: "para", explanation: "Purpose/goal" },
    { sentence: "Lo hago ___ amor.", correct: "por", explanation: "Cause/reason" },
    { sentence: "La tarea es ___ mañana.", correct: "para", explanation: "Deadline" },
    { sentence: "Pagué $50 ___ el libro.", correct: "por", explanation: "Exchange/price" },
  ]

  const newQuestion = () => {
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)]
    setCurrentSentence(randomSentence)
    setFeedback("")
  }

  const checkAnswer = (choice: string) => {
    if (choice === currentSentence.correct) {
      setFeedback(`¡Correcto! (${currentSentence.explanation})`)
      setFeedbackColor("text-green-600")
    } else {
      setFeedback(`Incorrecto. La respuesta es "${currentSentence.correct}" (${currentSentence.explanation})`)
      setFeedbackColor("text-red-600")
    }
    setTimeout(newQuestion, 3000)
  }

  useEffect(() => { newQuestion() }, [])

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">15. Por vs Para</h2>
      <p className="mb-6">Una de las distinciones más difíciles en español. Cada uno tiene usos específicos.</p>
      <Card className="mb-6 shadow-sm">
        <CardContent className="p-0">
          <h3 className="p-4 text-lg font-semibold border-b">Cuándo Usar Cada Uno</h3>
          <RuleAccordion title="Usa POR para:">
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Movimiento a través de:</strong> Camino <strong>por</strong> el parque.</li>
              <li><strong>Causa/razón:</strong> Lo hago <strong>por</strong> amor.</li>
              <li><strong>Períodos de tiempo:</strong> Estudio <strong>por</strong> la mañana.</li>
              <li><strong>Intercambio/precio:</strong> Pagué $20 <strong>por</strong> el libro.</li>
              <li><strong>Medio de comunicación:</strong> Hablo <strong>por</strong> teléfono.</li>
            </ul>
          </RuleAccordion>
          <RuleAccordion title="Usa PARA para:">
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Destino/dirección:</strong> Voy <strong>para</strong> casa.</li>
              <li><strong>Propósito/objetivo:</strong> Estudio <strong>para</strong> ser médico.</li>
              <li><strong>Destinatario:</strong> Este regalo es <strong>para</strong> ti.</li>
              <li><strong>Fecha límite:</strong> La tarea es <strong>para</strong> mañana.</li>
              <li><strong>Opinión personal:</strong> <strong>Para</strong> mí, es difícil.</li>
            </ul>
          </RuleAccordion>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Prueba de Por vs Para</h3>
          <div className="text-base md:text-lg text-center mb-4">
            Completa la oración: <br />
            <span className="font-bold text-[#cd0000]">{currentSentence.sentence}</span>
          </div>
          <div className="flex justify-center gap-4">
            <Button onClick={() => checkAnswer("por")} className="bg-blue-200 text-blue-800 font-bold py-3 px-6 text-xl hover:bg-blue-300">por</Button>
            <Button onClick={() => checkAnswer("para")} className="bg-green-200 text-green-800 font-bold py-3 px-6 text-xl hover:bg-green-300">para</Button>
          </div>
          <div className={`mt-4 text-center font-medium h-12 ${feedbackColor}`}>{feedback}</div>
        </CardContent>
      </Card>
    </div>
  )
}
