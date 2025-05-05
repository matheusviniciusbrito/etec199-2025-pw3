import Link from "next/link"

export default function NotFound(){
    return(
        <div>
            <h1>404</h1>
            <h2>Page not found</h2>
            <p>Volte para a página inicial</p>
            <Link href="/">Clique aqui</Link>
            <p>Ou clique no botão abaixo</p>
            <Link href="/" className="btn btn-primary">Voltar</Link>
            <p>Ou clique no botão abaixo</p>
        </div>
    )
}