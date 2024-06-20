import {Container, Grid, Typography, Button, Pagination} from '@mui/material';
import Link from 'next/link';
import { IProduct} from "@/app/models/products";
import {Paginator} from "@/components/Paginator";

// REVALIDATE EVERY 100 SECONDS
export const revalidate = 100;

export default async function Home({searchParams}: {searchParams: {page: string}}) {
    const data = await getHomeData(searchParams?.page);


  return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Product Catalog
        </Typography>
        <Grid container spacing={4}>
          {data.list.map((product: IProduct) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="subtitle2">{product.description}</Typography>
                <Link href={`/${product.id}`} passHref>
                  <Button variant="contained" color="primary">View</Button>
                </Link>
              </Grid>
          ))}
        </Grid>
          <Paginator page={data.page} totalPages={data.totalPages} size={data.size} />
      </Container>
  );
}

async function getHomeData(page?: string): Promise<any> {
    try {
        const data = await fetch(`http://localhost:3000/api/products/?page=${page || 1}&size=5`);

        return await data.json();
    } catch (e) {
        // ERROR HANDLING
        console.error(e);
        return [];
    }
}
