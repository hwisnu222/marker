use std::{error::Error, sync::{Arc, Mutex}};

use rusqlite::{Connection, Result};
use serde::Serialize;
use tracing::{error};

#[derive(Clone, Debug, Serialize)]
pub struct Bookmark{
    pub id: i16,
    pub title: String,
    pub url : String
}

pub struct BookmarkRepository{
    pub repo: Arc<Mutex<Connection>>,
}

impl BookmarkRepository{
    pub fn get(&self) -> Result<Vec<Bookmark>, Box<dyn Error>> {
        // let mut bookmarks = Vec::new();

        let query = "SELECT * FROM bookmark";

        let db = self.repo.lock().map_err(|_| "failed lock db to process")?;

        let mut prepare = db.prepare(query)?;

        
        let bookmark_iter = prepare.query_map([], |row|{
            Ok(Bookmark{
                id: row.get(0)?,
                title: row.get(1)?,
                url: row.get(2)?
            })
        }).map_err(|e| e.to_string())?;

        let bookmarks = bookmark_iter.collect::<Result<Vec<Bookmark>, rusqlite::Error>>()?;
        
        Ok(bookmarks)
    }

    pub fn add(&self, title: String, url: String)-> Result<String, Box<dyn Error>>{
        let query = "INSERT INTO bookmark (title, url) VALUES(?1,?2)";

        let db = self.repo.lock().map_err(|_| "failed lock db to process")?;
        match db.execute(query, (title, url)) {
            Ok(_)=> {
                Ok("success add url".to_string())
            }

            Err(e)=>{
                error!("{}", e.to_string());
                Err("failed add url to bookmark".into())
            }
        }

    }

    pub fn delete(&self, id: String) -> Result<String, Box<dyn Error>>{
        let query = "DELETE FROM bookmark WHERE id=?1";

        let db = self.repo.lock().map_err(|_| "failed lock database")?;

        match db.execute(query, (id,)) {
            Ok(_)=> {
                Ok("success delete bookmark".to_string())
            }
            Err(e)=>{
                error!("{}", e.to_string());
                Err("failed delete bookmark".into())
            }
        }

    }
}
