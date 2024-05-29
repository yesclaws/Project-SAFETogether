import React, { useState } from 'react';
import { Select, Textarea, TextInput, Button } from '@mantine/core';
import classes from './Incident.module.css';
import axios from 'axios';
import moment from 'moment';

function Incident() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    student_name: '',
    student_contact_no: '',
    student_email: '',
    datetime: '',
    category: '',
    additional_info: '',
    area: '', 
    time: ''
  });

  const areaCoordinates = {
    'BIZ1': {lat: 1.2926189302885218, lon: 103.77412253014059},
    'BIZ2': {lat: 1.2934437649479136, lon: 103.77512005816632},
    'Hon Sui Sen Memorial Library': {lat : 1.2932867544940563, lon: 103.77452657368927},
    'LT16' : {lat: 1.2940953043940495, lon: 103.77386069803853},
    'LT17' : {lat: 1.2936425812237684, lon: 103.77399191833064}, 
    'LT18': {lat: 1.2936245751869282, lon:103.77454252896814}, 
    'NUSS Kent Ridge Guild House' : {lat:1.2933287616919957, lon:103.77307080336874},
    'Shaw Alumni House' : {lat:1.2933030387789797, lon:103.77339756762558},
    'COM1' : {lat: 1.2948709636600964, lon: 103.77368667109855}, 
    'COM2': {lat: 1.2943063983624252, lon: 103.77409876703419},
    'COM3': {lat:1.294908250570727, lon:103.77458656153817},
    'COM4': {lat:1.2952019516781184, lon:103.77492393547705}, 
    'I-Cube': {lat:1.292695646916391, lon:103.77560585192501},
    "LT15" : {lat:1.2956026747180835, lon:103.77345003354418},
    'LT19': {lat:1.293742293006904, lon:103.77447046845718},
    'Terrace': {lat:1.2951554484131587, lon:103.77430384466932},
    'E1' : {lat:1.2988381947162229, lon: 103.77108181470119}, 
    'E2' : {lat:1.299383672392807, lon:103.77118992308851}, 
    'E3' : {lat:1.299522902783336, lon:103.77172970533047},
    'E4': {lat:1.2984704331015777, lon:103.77235161953695},
    'E5': {lat:1.2981157303304134, lon:103.77244035744707}, 
    'E6' : {lat:1.2998036546595166, lon:103.77298559239703}, 
    'E7': {lat:1.2989065767582317, lon:103.77348718076146}, 
    'E8' : {lat:1.299062351087502, lon:103.77283964213518}, 
    'EA' : {lat:1.3002606201615545, lon:103.7707693384343}, 
    'EW1': {lat:1.2990997843699308, lon:103.77059262302629}, 
    'Information Technology' : {lat:1.29776685095961, lon:103.77246119981756}, 
    'LT1' : {lat:1.299797507041579, lon:103.77116845378015}, 
    'LT2': {lat:1.2993600871556805, lon:103.77118920549049},
    'LT3' : {lat:1.298023824688723, lon:103.77332603657919},
    'LT4': {lat:1.2978016290510617, lon:103.77350795378013}, 
    'LT6' : {lat:1.2987748926125777, lon:103.77197086151524},
    'LT7A' : {lat:1.3005149963294453, lon:103.77090179218057},
    'LT7' : {lat:1.3002504307110756, lon:103.77108297610226},
    "TechnoEdge": {lat:1.2979899647461715, lon: 103.77173076027302},
    'Central Library' : {lat:1.2968015032309292, lon:103.77339460858852},
    'AS1' : {lat:1.2951123674940161, lon:103.77205062120133}, 
    'AS2': {lat:1.2953534210165927, lon: 103.7711153308944},
    'AS3' : {lat:1.294709060502206, lon:103.77136074214187},
    'AS4' : {lat:1.2945896519719673, lon:103.77182080914545}, 
    'AS5': {lat:1.2942345925440875, lon:103.77184722526721}, 
    'AS6': {lat:1.2955244825001389, lon:103.77321641189998},
    'AS7' : {lat:1.2942686547040922, lon:103.77103545482477}, 
    'AS8': {lat:1.2962544726879097, lon:103.77241828447177},
    'Deck' : {lat:1.2944532369113717, lon:103.77255971905697}, 
    'LT8' : {lat:1.2941524300266172, lon:103.77194848706338}, 
    'LT9' : {lat:1.2950226530233386, lon:103.77232169830619}, 
    'LT10': {lat:1.2948981917027425, lon:103.7720038178078},
    'LT11': {lat:1.295480073607626, lon:103.77142988296792},
    'LT12' : {lat:1.2950024066528123, lon: 103.77117899759217}, 
    'LT13': {lat:1.2951315058386657, lon:103.77092811221642},
    'LT14': {lat:1.295801107430761, lon:103.77339638936193}, 
    'Eusoff Hall' : {lat:1.2938381774852756, lon:103.7704336933549},
    'KE7 Hall' : {lat:1.2926174208168495, lon:103.78104310959786}, 
    'Kent Ridge Hall': {lat:1.2919332809188595, lon:103.77477713013192}, 
    'Raffles Hall' : {lat:1.3003572548188733, lon:103.77399338261661},
    'Sheares Hall': {lat:1.291395364108262, lon:103.77579647008905},
    'Temasek Hall': {lat:1.2929084874365626, lon:103.7714146529324},
    "CELC": {lat:1.2971009284348307, lon:103.77143137791765},
    "SDE1" : {lat:1.2975104907948884, lon:103.77063480243554},
    'SDE2':  {lat:1.297518075282422, lon:103.77110516129164}, 
    'SDE3': {lat:1.2977342331672954, lon:103.770657561735}, 
    'SDE4': {lat:1.2967935243006727, lon:103.77035196790662},
    'Centre for Life Sciences': {lat:1.294551487273294, lon:103.78090908357706},
    'Frontier': {lat:1.2964512071722945, lon:103.7803913482194}, 
    "LT21" : {lat:1.2954265195285704, lon:103.77945895314687}, 
    'LT26': {lat:1.2964216277416414, lon:103.78074558528336}, 
    'LT27' : {lat:1.2970342401128947, lon:103.7808653741858}, 
    'LT28' : {lat:1.297360035980192, lon:103.78119949441648}, 
    'LT29': {lat:1.297419912524197, lon:103.7812857307098}, 
    'LT31': {lat:1.2968947330935587, lon: 103.78044711414762},
    'LT32' : {lat:1.2962766821407663, lon:103.77828259128741},
    'LT33' : {lat: 1.29779965951031, lon:103.78093717811184},
    'LT34' : {lat:1.2978461391569667, lon:103.78103912461357}, 
    'Medicine Sciece Library' : {lat:1.2970185985879843, lon:103.78137025688491}, 
    'MD1': {lat:1.295561759002557, lon:103.78044750105428},
    'MD2' : {lat: 1.2949702471459728, lon:103.78115981954039},
    'MD3': {lat:1.2954916010502224, lon:103.78124442861065},
    'MD4' : {lat:1.2958030394730147, lon:103.78079252310016}, 
    'MD5': {lat:1.295733570638232, lon:103.78129294534726},
    'MD6': {lat:1.2953849761412641, lon:103.78167539425083}, 
    'MD7': {lat:1.296114606738767, lon:103.78096669501457}, 
    'MD9' : {lat:1.296745944968266, lon:103.78117861522244},
    'MD10': {lat:1.2965978640878926, lon:103.78194142714514},
    'MD11': {lat: 1.2959355505587387, lon: 103.78196502904318},
    'S1A' : {lat:1.2963441421747939, lon:103.77831688425563}, 
    'S2' : {lat:1.2955094477157525, lon:103.77829357465384}, 
    'S3': {lat:1.2955778458094738, lon:103.77873287084681}, 
    'S4' : {lat:1.2958488575336753, lon:103.77917884288111},
    'S5' : {lat:1.2955545329672, lon:103.77969768617376},
    'S6' : {lat:1.2951620113640967, lon:103.78030243965394}, 
    'S7': {lat:1.2962997914713814, lon:103.77882449902867},
    'S8' :{lat:1.2960935068789994, lon:103.77933637450892},
    'S9': {lat:1.295896116122384, lon:103.7802767819158},
    'S10': {lat:1.2962987195523186, lon:103.77968261254105},
    'S11' : {lat:1.2966840208618948, lon:103.77881587668499}, 
    'S12' : {lat:1.2969691542468722, lon: 103.77885536039128},
    'S13' : {lat: 1.29689314966511, lon:103.7790279983645}, 
    'S14': {lat:1.2968028942213163, lon:103.77976923296502},
    'S15': {lat:1.2971084959741046, lon:103.78001472731289}, 
    'S16': {lat:1.296763308498965, lon:103.78030615286676},
    'S17' : {lat:1.2977156682103979, lon:103.78061735420121}, 
    'MPSH' : {lat:1.300864428808669, lon:103.7760713495559},
    'University Health Centre' : {lat:1.2991347997624272, lon:103.77639296757461},
    'USC' : {lat:1.2999163068782171, lon:103.77552562070954},
    'University Field' : {lat:1.2987747639518892, lon:103.77833094504153},
    'CREATE': {lat:1.3039334386362373, lon:103.77349594016185},
    'ERC' : {lat:1.3057778527736938, lon: 103.77266863078283}, 
    'SRC' : {lat:1.3045483135934444, lon:103.77205197753405}, 
    'Town Green': {lat:1.3049815794259676, lon:103.77315183893418},
    'Town Plaza': {lat:1.3040599593506852, lon: 103.77390230793944},
    'Yale-NUS' : {lat : 1.3069482255122051, lon: 103.77192858846391}, 
    'KR terminal' : {lat:1.2942729051442532, lon:103.76975421800093}, 
    "UCC" : {lat : 1.3016711459495094, lon:103.77221564858404},
    "University Hall" : {lat: 1.2973952184350126, lon:103.77794911517206},
    "Museum" : {lat:1.3014860239775463, lon:103.77300658798342},
    'VENTUS': {lat:1.2953673234766312, lon:103.77019344472755},
    'Yusof Ishak House' : {lat: 1.2986673255191659, lon:103.77500143675611},
    'YST': {lat: 1.302512128451031, lon: 103.77214687124497},
    'Temasek Lifesciences Laboratory' : {lat:1.2944275203655844, lon:103.77726093943862},
    'TCOMS' : {lat:1.293621584685719, lon:103.77690683998254},
    'Institute for Mathematical Sciences' : {lat:1.2928909698761932, lon:103.77976223772423},
    'CAPT' : {lat:1.3079535289130302, lon:103.77332945874134},
    'Cinnamon' : {lat: 1.3068354932363735, lon:103.7734834798072},
    'Helix House' : {lat: 1.2912750440075407, lon: 103.77999104862269},
    'Light House': {lat:1.290510323333194, lon:103.78164549922555},
    'Pioneer House' : {lat : 1.2906576913916978, lon: 103.78064752604715},
    'PGPR' : {lat: 1.2912300198645228, lon:103.78229394499878},
    'RC4' : {lat: 1.3083753027215503, lon: 103.7734098175583}, 
    'RVRC' : {lat:1.2977735892891067, lon:103.77701653755534}, 
    'Tembusu' : {lat: 1.3062798226250765, lon:103.77371116312196},
    'UTR' : {lat:1.305342546616742, lon: 103.77389197046016}, 
    'Kent Vale': {lat:1.3023409164001407, lon:103.76924239573675}
  };
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    // Function to validate form fields
    const fieldLabels = {
      student_name: 'Name',
      student_contact_no: 'Contact Number',
      student_email: 'Email Address',
      datetime: 'Date',
      category: 'Crime Category',
      area: 'General Location',
    };
  
    const validateForm = () => {
      const requiredFields = ['student_name', 'student_contact_no', 'student_email', 'datetime', 'category', 'area'];
      const missingFields = requiredFields.filter(field => !formData[field]);
  
      if (missingFields.length > 0) {
        const missingFieldNames = missingFields.map(field => fieldLabels[field]).join(', ');
        alert(`Please fill in all required fields: ${missingFieldNames}`);
        return false;
      }
  
      return true;
    };

  const handleSubmit = async () => {
    try {
      setLoading(true); // Set loading to true while the request is in progress
      const form = new FormData()

      const coordinates = areaCoordinates[formData.area] || { lat: null, lon: null };
      form.append("lat", coordinates.lat);
      form.append("lon", coordinates.lon);
      form.append("student_name", formData.student_name)
      form.append("student_contact_no", formData.student_contact_no)
      form.append("student_email", formData.student_email)
      form.append("datetime", moment(formData.datetime).format("YYYY-MM-DD hh:mm:ss"))
      form.append("category", formData.category)
      form.append("additional_info", formData.additional_info)
      form.append("area", formData.area)
      form.append("time", formData.time)

      // Validate form fields before submission
      const isValid = validateForm();
      if (!isValid) {
        setLoading(false);
        return;
      }

      const response = await axios.put('/incidents/add_incident', form);
  
      if (response.status === 200) {
        // Handle success
        setSuccess(true);
        console.log('Incident created successfully');
        // Clear form inputs using the setFormData function
      } else {
        // Handle error
        console.error('Error creating incident');
      }
    } catch (error) {
      // Handle any network or request-related errors
      console.error('Network error', error);
    } finally {
      setLoading(false); // Reset loading to false regardless of success or error
    }
  };
  
  const inputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Adjust the space between input boxes
    marginBottom: '25px', // Add some vertical spacing between input sections
  };

  const marginMidStyle = {
    marginTop: '20px', // Adjust the margin-top value as needed
  };
  

  return (
    <div style={{ paddingTop: '15px' }}>
      <div>
        <h2 style={{ textAlign: 'left' }}>Report a crime :</h2>
      </div>
      <div style={{ ...inputContainerStyle, ...marginMidStyle }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <TextInput
            size="md"
            radius="md"
            variant="filled"
            label="Name"
            withAsterisk
            description="Full name as per NRIC"
            placeholder="Name"
            name="student_name"
            onChange={handleInputChange}
          />
        </div>
        <div style={{ flex: 1 }}>
          <TextInput
            size="md"
            radius="md"
            variant="filled"
            label="Contact Number"
            description="Enter your mobile number"
            placeholder="Contact Number"
            name="student_contact_no"
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <div style={{ ...inputContainerStyle, ...marginMidStyle }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <TextInput
            size="md"
            radius="md"
            variant="filled"
            label="Email Address"
            description="Enter your email address"
            placeholder="Email"
            name="student_email"
            onChange={handleInputChange}
          />
        </div> 
        <div style={{ flex: 1 }}>
          <TextInput
            size="md"
            radius="md"
            variant="filled"
            label="Date"
            description="Enter the date of report"
            placeholder="DD/MM/YYYY"
            name="datetime"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div style={{ ...inputContainerStyle, ...marginMidStyle }}>
        <div style={{ flex: 1, marginRight: '10px'}}>
          <Select
          classNames={{ option: classes.wrapper }}
          size="md"
          radius="md"
          variant="filled"
          label="Crime Category"
          description="Description"
          placeholder="Select"
          data={['Theft', 'Vandalism', 'Peeping Tom', 'Assault', 'Lost and Found']}
          name="category"
          onChange={(e) => {
            setFormData({...formData, category: e})
          }}
        />
        </div>

        <div style={{ flex: 1}}>
        {/* New dropdown list for time of incident */}
        <Select
          classNames={{ option: classes.wrapper }}
          size="md"
          radius="md"
          variant="filled"
          label="Time of Incident"
          description="Select the time period of the incident"
          placeholder="Select"
          data={[
            {group : "5am-11am", items: ["Morning"]},
            {group : "12pm-4pm", items: ["Afternoon"]},
            {group : "4am-7pm", items: ["Evening"]},
            {group : "8pm-11am", items: ["Night"]},
            {group : "12mn-4am", items: ["Midnight"]},

          ]}
          name="time"
          onChange={(e) => {
            setFormData({ ...formData, incident_time: e });
          }}
        />
      </div>
    </div>

    <div style={{ marginMidStyle, flex: 1}}>
      <Select
        classNames={{ option: classes.wrapper }}
        size="md"
        radius="md"
        variant="filled"
        label="General location of Crime"
        description="Pick where the crime occurred"
        placeholder="Select"
        data={[
          { group: 'BIZ', items: ['BIZ1', 'BIZ2', 'Hon Sui Sen Memorial Library', 'LT16', 'LT17', 'LT18', 'NUSS Kent Ridge Guild House', 'Shaw Alumni House'] },
            { group: 'Computing', items: ['COM1', 'COM2', 'COM3', 'COM4', 'I-Cube', "LT15", 'LT19', 'Terrace'] },
            { group: "Engineering", items:['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'EA', 'EW1', 
              'Information Technology', 'LT1', 'LT2', 'LT3', 'LT4', 'LT6', 'LT7A', 'LT7', "TechnoEdge"]},
            { group: 'FASS', items: ['Central Library', 'AS1', 'AS2','AS3','AS4','AS5','AS6','AS7','AS8', 
              'Deck', 'LT8', 'LT9', 'LT10', 'LT11', 'LT12', 'LT13', 'LT14']}, 
            { group: "Halls", items:['Eusoff Hall' , 'KE7 Hall' ,'Kent Ridge Hall', 'Raffles Hall', 'Sheares Hall','Temasek Hall']},
            { group: "Houses and Residences", items: ['CAPT', 'Cinnamon', 'Helix House', 'Light House', 'Pioneer House', 'PGPR', 'RC4', 'RVRC', 'Tembusu', 'UTR']},
            { group: "SDE", items: ["CELC", "SDE1", 'SDE2', 'SDE3', 'SDE4']},
            { group : "Science/Med", items: ['Centre for Life Sciences', 'Frontier', "LT21", 'LT26', 'LT27', 'LT28', 'LT29', 'LT31', 'LT32', 'LT33', 'LT34', 
              'Medicine Science Library', 'MD1', 'MD2', 'MD3', 'MD4', 'MD5', 'MD6', 'MD7', 'MD9', 'MD10', 'MD11',
              'S1A', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12', 'S13', 'S14', 'S15', 'S16', 'S17']},
            { group: "University Sports Centre", items:['MPSH', 'University Health Centre', 'USC', 'University Field']},
            { group: "University Town", items: ['CREATE','ERC', 'SRC', 'Town Green', 'Town Plaza', 'Yale-NUS']}, 
            { group : "Others", items:['Kent Vale', 'KR terminal',"Museum", 'TCOMS', 'Temasek Lifesciences Laboratory' ,'Institute for Mathematical Sciences',  "UCC", "University Hall",'VENTUS', 'Yusof Ishak House', 'YST']}
        ]}
        name="area"
        searchable
        nothingFoundMessage="Nothing found..."
        onChange={(e) => {
          setFormData({ ...formData, area: e });
        }}
      />
    </div>


    

      <div style={{marginMidStyle,  marginTop: '30px' }}>
        <Textarea
          size="md"
          radius="md"
          label="Detail of crime"
          variant="filled"
          description="Include the relevant details, including to specify the exact location of crime"
          placeholder="Details of crime here (Eg. Description of peeeping tom occuring at 3rd floor toilet in S16)"
          name="additional_info"
          onChange={handleInputChange}
          autosize
          minRows={5}
          maxRows={10}
        />
      </div>

      {success && (
      <div style={{ color: 'green', marginTop: '10px', fontSize: '1.2em'}}>
        Successfully submitted!
      </div>
    )}

      <Button
      variant="filled"
      onClick={handleSubmit}
      style={{
        position: "absolute",
        bottom: "40px", // Adjust the bottom position as needed
        right: "20px", // Adjust the right position as needed
      }}
>
  Submit
</Button>

    </div>
  );
}

export default Incident;

