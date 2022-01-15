import React,{useState} from "react";
import { db } from "../firebase/firestore";
import { storage } from "../firebase/firebaseStorage";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'; 

const Seller =()=>{
    const [businessLogo, setbusinessLogo] = useState(null)
    const [businessLogoUrl, setbusinessLogoUrl] = useState()
    const [businessName, setbusinessName] = useState()
    const [category, setcategory] = useState()
    const [description, setdescription] = useState()
    const [name, setname] = useState()
    const [phone, setphone] = useState()
    const [sellerPhoto, setsellerPhoto] = useState(null)
    const [sellerPhotoUrl, setsellerPhotoUrl] = useState(null)
    const [tagline, settagline] = useState()
    const [reviews, setreviews] = useState([])
    const [files, setFiles] = useState([])
    const [loader, setloader] = useState(false)
    const [reviewloader, setreviewloader] = useState(false)
    const [photoloader,setphotoloader] = useState(false)
    const [logoloader, setlogoloader] = useState(false)
    const onFileChange = e => {
        
        for (let i = 0; i < e.target.files.length; i++) {
            const newFile = e.target.files[i];
            newFile["id"] = Math.random();

            setFiles(prevState => [...prevState, newFile]);
        }
    };

    const handleUploadChange = e=>{
        if(e.target.files[0]){
            setbusinessLogo(e.target.files[0]);
        }
    }

    const handleLogoUpload=(e)=>{
        e.preventDefault();
        setlogoloader(true);
        const uploadTask= storage.ref(`businessLogo/${businessLogo.name}`).put(businessLogo);
        console.log("entered")
        uploadTask.on(
            "state_changed",
            snapshot=>{},
            error=>{
                console.log("entered error")
                console.log(error);
            },
            ()=>{
                storage
                .ref("businessLogo")
                .child(businessLogo.name)
                .getDownloadURL()
                .then(url=>{
                    setlogoloader(false);
                    console.log(url);
                    setbusinessLogoUrl(url)
                    console.log(businessLogoUrl);
                });
            }
        )
    }
    const handlephotoUploadChange = e=>{
        if(e.target.files[0]){
            setsellerPhoto(e.target.files[0]);
        }
    }

    const handlephotoUpload=(e)=>{
        e.preventDefault();
        setphotoloader(true);
        const uploadTask= storage.ref(`sellerPhotos/${sellerPhoto.name}`).put(sellerPhoto);
        console.log("entered")
        uploadTask.on(
            "state_changed",
            snapshot=>{},
            error=>{
                console.log("entered error")
                console.log(error);
            },
            ()=>{
                storage
                .ref("sellerPhotos")
                .child(sellerPhoto.name)
                .getDownloadURL()
                .then(url=>{
                    console.log(url);
                    setsellerPhotoUrl(url)
                    console.log(sellerPhotoUrl);
                    setphotoloader(false);
                });
            }
        )
    }
    function handledefault(e) {
        e.preventDefault()
        const uniqueArray = reviews.filter(function (item, pos, self) {
            return self.indexOf(item) == pos;})
       setloader(true)
        db.collection("Seller").doc(`${businessName.split(" ").join("-")}-${Math.floor(Math.random()*(999-100+1)+100)}`).set(
            {
                businessLogo:`${businessLogoUrl}`,
                businessName:`${businessName}`,
                category:`${category}`,
                businessLogo:`${businessLogoUrl}`,
                name:`${name}`,
                phone:`${phone}`,
                sellerPhoto:`${sellerPhotoUrl}`,
                tagline:`${tagline}`,
                reviews: uniqueArray,

            }
        ).then((docRef) => {
           setloader(false)
            console.log(`done`)

        }).catch((error) => {
            console.error("Error adding document: ", error);
        })
    }

    const onUploadSubmission = e => {
        e.preventDefault();
        setreviewloader(true)
        const promises = [];
        files.forEach(file => {
            const uploadTask =
                storage.ref().child(`images/${businessName}/${file.name}`).put(file);
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (snapshot.state === storage.TaskState.RUNNING) {
                        console.log(`Progress: ${progress}%`);
                    }
                },
                error => console.log(error.code),
                async () => {
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

                    setreviews(prevState => [...prevState, downloadURL]);

                    console.log(downloadURL)

                }
            );
        });
        Promise.all(promises)
            .then(() => {
                
                setreviewloader(false)
                alert('done');
              
            })
            .catch(err => console.log(err.code));
    }

    console.log(reviews)
    return(
        <>
        <div className="form-container">
            <form >
                <div className="file">
                <label className="form-label">businessLogo</label>
                <input className="form-input" type="file" onChange={handleUploadChange}></input>
                <button onClick={(e)=>handleLogoUpload(e)}>upload</button>
                {logoloader ?
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                : null}
                </div>
                
                <label className="form-label">businessName</label>
                <input onChange={e => setbusinessName(e.target.value)} className="form-input" type="text"></input>
                
                <label className="form-label">category</label>
                <input onChange={e => setcategory(e.target.value)} className="form-input" type="text"></input>
                
                <label className="form-label">description</label>
                <input onChange={e => setdescription(e.target.value)} className="form-input" type="text"></input>
                
                <label className="form-label">name</label>
                <input onChange={e => setname(e.target.value)} className="form-input" type="text"></input>

                <label className="form-label">phone</label>
                <input onChange={e => setphone(e.target.value)} className="form-input" type="text"></input>
                

                <label className="form-label">tagline</label>
                <input onChange={e => settagline(e.target.value)} className="form-input" type="text"></input>

                <div className="file">
                <label className="form-label">sellerPhoto</label>
                <input onChange={handlephotoUploadChange} className="form-input" type="file"></input>
                <button onClick={(e)=>handlephotoUpload(e)}>upload</button>
                {photoloader ?
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                : null}
                </div>
                <div className="file">
                <label className="form-label">review</label>
                <input className="form-input"  type="file" multiple  onChange={onFileChange} ></input>
                <button onClick={onUploadSubmission}>upload</button>
                {reviewloader ?
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                : null}
                </div>
               
                <button className="btn-submit" onClick={(e) => handledefault(e)}> submit</button>
                {loader ?
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                : null}
            </form>
        </div>
        </>
    )
}
export default Seller;