import MangaCard from '@/components/Card'
import CardGrid from '@/components/CardGrid'
import { getSearchResults } from '@/lib/getData'
import { Divider, Typography } from '@mui/material'
import React from 'react'

export default async function Page({params}:{params:{chapterId:string, mangaId:string}}) {

    const {data:randomManga} = await getSearchResults("",Math.floor(Math.random()* 200) + 1, "relevance")

if(!randomManga) return null

  return (
    <div className='p-4 my-4'>
        <Typography variant='h5' component="h2" sx={{fontWeight:700}} gutterBottom>
            Recommendation for you
        </Typography>
            <Divider sx={{mb:2}}/>
        <CardGrid>
            {randomManga?.items?.map(item => <MangaCard data={item} key={item.id}/>)}
        </CardGrid>
    </div>
    
  )
}
