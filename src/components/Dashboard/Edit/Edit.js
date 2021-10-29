import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from '../../../axios/axios';
import { EditForm } from './EditForm/EditForm';
import { ScaleLoader } from 'react-spinners';
import { ErrorMessage } from '../../Utilities';

const Edit = () => {
    const [project, setProject] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { projectID } = useParams()

    const updateProject = async (payload) => {
        setLoading(true)
        try {
            const response = await axios.patch('/projects/' + projectID, payload)
            const data = await response.data
            console.log(data)
            setProject(data)
            setLoading(false)
        } catch(err) {
            console.log(err)
            setError(err)
            setLoading(false)
        }
    }

    
    useEffect(() => {
        const fetchProject = async () => {
            setError(null)
            setLoading(true)
            try {
                const response = await axios.get('/projects/' + projectID)
                const data = await response.data
                console.log(data)
                setProject(data)
                setLoading(false)
            } catch(err) {
                console.log(err)
                setError(err)
                setLoading(false)
            }
        }
        fetchProject()
    }, [projectID])

    return (
        <div>
            {loading && <ScaleLoader color="#f7f7f7"/>}
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            {!error && <EditForm submit={updateProject} preData={project} loading={loading} error={error}/>}
        </div>
    )
}

export { Edit }