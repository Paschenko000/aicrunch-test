import {Container, Grid, Typography, Button, Pagination, Card, CardContent} from '@mui/material';
import Link from 'next/link';
import { IProduct} from "@/app/models/products";
import {Paginator} from "@/components/Paginator";
import {Stack} from "@mui/system";

// REVALIDATE EVERY 100 SECONDS
export const revalidate = 100;

export default async function Home({searchParams}: {searchParams: {page: string}}) {
    const data = await getHomeData(searchParams?.page);


  return (
      <Container style={{padding: "40px"}}>
        <Typography variant="h4" gutterBottom color="white">
          Product Catalog
        </Typography>
        <Grid container spacing={4} style={{marginBottom: "30px"}}>
          {data.list.map((product: IProduct) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography variant="subtitle2">{product.description}</Typography>
                        <Link href={`/${product.id}`} passHref style={{color: "blue"}}>
                          View
                        </Link>
                      </CardContent>
                  </Card>
              </Grid>
          ))}
        </Grid>
          <Paginator page={data.page} totalCount={data.totalCount} size={data.size} />
      </Container>
  );
}

async function getHomeData(page?: string): Promise<any> {
    try {
        const data = await fetch(`https://aicrunch-test.vercel.app/api/products/?page=${page || 1}&size=5`);

        return await data.json();
    } catch (e) {
        // ERROR HANDLING
        console.error(e);
        return [];
    }
}
