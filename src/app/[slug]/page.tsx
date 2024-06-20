import {Container, Typography} from "@mui/material";

export default async function ProductPage({params}: {params: {slug: string}}) {
    const data = await getProduct(params.slug);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {data.item.name}
            </Typography>
            <Typography>{data.item.description}</Typography>
        </Container>
    );
}

async function getProduct(slug: string): Promise<any> {
    try {
        const data = await fetch('http://localhost:3000' + `/api/product/${slug}`);
        return await data.json();
    } catch (e) {
        // ERROR HANDLING
        console.error(e);
        return [];
    }
}
