import Router from "router";
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mediaRouter = new Router();

mediaRouter.get('/uploads/photos/:filename', (req, res) => {    
    const filePath = path.join(__dirname, '../../uploads/photos/', req.params.filename);
    try{
        res.sendFile(filePath)
    }
    catch(err){
        if (err) {
            const fallbackImage = path.join(__dirname, '../../uploads/no-photo.png');
            res.sendFile(fallbackImage, (err) => {
                if (err) {
                    res.status(404).send('File not found');
                }
            });
        }
    }
})

mediaRouter.get('/uploads/videos/:filename', (req, res) => {    
    const filePath = path.join(__dirname, '../../uploads/videos', req.params.filename);
    try{
        res.sendFile(filePath)
    }
    catch(err){
        if (err) {
            const fallbackImage = path.join(__dirname, '../../uploads/no-photo.png');
            res.sendFile(fallbackImage, (err) => {
                if (err) {
                    res.status(404).send('File not found');
                }
            });
        }
    }
})

export default mediaRouter;