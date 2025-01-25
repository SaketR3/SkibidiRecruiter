import { useState, useEffect } from 'react'; 

export default function ApplicantChat() {
    const jobs = ['Software Engineer', 'Data Analyst', 'Sales Manager']; 
    
    const [jobDescription, setJobDescription] = useState('');
    const [descriptionsToDisplay, setDescriptionsToDisplay] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [displayDescription, setDisplayDescription] = useState(false);

    const handleSubmit = async () => {
        // setJobDescription('RESPONSE');
        // setSubmitted(true);
        
        const formData = new FormData();
        formData.append('text', jobDescription);
        formData.append('user_id', 'applicant1'); // Using a default agent ID for now
        formData.append('job_id', 95); 

        try {
            const response = await fetch('http://localhost:5000/send-chat-applicant', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            if (data.status === 'success') {
                setJobDescription(data.message);
                setSubmitted(true);
                console.log('Message sent successfully');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        if (submitted) {
            // setDescriptionsToDisplay(...jobDescription);
            setDescriptionsToDisplay(prevDescriptions => [...prevDescriptions, jobDescription]);
            setDisplayDescription(true);
        }
        setSubmitted(false); 
    }, [submitted]);

    return (
        <div className='chat-container'>
            <div className='side-panel'>
                <h2 className='panel-header'>Jobs</h2>
                {jobs.map((job, index) => <button className='job-button' key={index}>{job}</button>)}
            </div>
            <div className='main-panel'>
                <h2 className='panel-header'>Chat</h2>
                <div className='description-area'>
                    {displayDescription && descriptionsToDisplay.map((description, index) => <div key={index} dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br />') }} />)}
                </div>
                <div className='message-area'>
                    <textarea className="message-box" placeholder="Send a message..." onChange={(e) => setJobDescription(e.target.value)} />
                    <button className="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}