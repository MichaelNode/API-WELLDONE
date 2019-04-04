
import { convertToRaw } from 'draft-js';
import moment from 'moment';


const validation = function (state, setState) {
    let titleError = ''
    let summaryError =  ''
    let contentError =  ''
    let stateError =  ''
    let categoryError =  ''
    let fileError =  ''
    let publi_dateError = ''
    let urlError = ''
    let ask_fileError = ''
    let editorStateError= ''
    let datenow = null
    let datepubli = null
    const fileMaxSize = 15 * 1000 * 1000; // 15MB

    if(state.title == '') {
      titleError = 'Title required'
    }
    if(state.ask_file == null) {
      ask_fileError = 'required'
    }
    if(state.ask_file == 'imagen' && state.file == null) {
      fileError = 'Image is required'
    }
    if(state.file && state.file.name !== undefined && state.ask_file == 'imagen' && !(
        state.file.name.includes('.jpg') ||
        state.file.name.includes('.jpg') || 
        state.file.name.includes('.png')))
    {
      fileError = 'Invalid image'
    }

    if(state.file && state.file.size > fileMaxSize && state.ask_file == 'imagen')
    {
        fileError = 'The image must be less than 15 mb'
    }
    
    if(state.ask_file == 'video' && !state.url) {
      urlError = 'URL is required'
    }
    if(state.publi_date) {
      datepubli = moment(state.publi_date).format('DD-MM-YYYY');
      datenow = moment(Date.now()).format('DD-MM-YYYY');
     
      if(state.state == 'true' && datepubli < datenow) {
        publi_dateError = "the publication date cannot be less than today's"
      }
    }
    
    if(state.state == 'true' && state.publi_date === null) {
      publi_dateError = "the publication date is required"
    }
    if(state.state == '') {
      stateError = 'State required'
    }
    if(state.summary == '') {
      summaryError = 'Summary required'
    }
    if(state.category == null) {
      categoryError = 'Category required'
    }
    if(!convertToRaw(state.editorState.getCurrentContent()).blocks[0].text)
    {
      editorStateError = "Content required"
    }
    if(summaryError || categoryError || 
        editorStateError || titleError ||
        ask_fileError || stateError) {
         return {
            summaryError,
            categoryError, 
            editorStateError,
            titleError,
            ask_fileError,
            stateError,
            publi_dateError,
            fileError,
            urlError
          }
          
    }
    return true;
  } 


export default validation;