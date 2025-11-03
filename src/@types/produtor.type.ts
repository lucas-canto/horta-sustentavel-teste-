export type ProdutorType={
    id_produtor?:number
    hortas_id_hortas?:number
    nome_produtor:string
    telefone_produtor:string
    hash_senha:string
    email_produtor:string
    nr_cpf:string
}

export type SignInProdutorRequest={
    nome_produtor:string
    nr_cpf:string
    email_produtor:string
    senha:string
    telefone_produtor?:string
    pergunta_1:string
    resposta_1:string
    pergunta_2:string
    resposta_2:string
}