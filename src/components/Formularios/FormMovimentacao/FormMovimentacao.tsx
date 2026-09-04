import React, { useMemo, useState } from "react";
import MovimentacaoRequests from "../../../fetch/MovimentacaoRequest";

interface IMovimentacao {
	id_movimentacao?: number;
	id_produto?: number;
	id_movimentacao_origem?: number;
	motivo_movimentacao?: string;
	tipo_movimentacao?: string;
	quantidade?: number;
	preco_unitario?: number;
	valor_total?: number;
	observacao?: string;
	data_movimentacao?: string | Date;
	ativo?: boolean;
}

interface FormMovimentacaoProps {
	movimentacoes?: IMovimentacao[];
	onSuccess?: () => void;
}

interface FormData {
	id_produto: number | "";
	id_movimentacao_origem: number | "";
	motivo_movimentacao: string;
	tipo_movimentacao: string;
	quantidade: number | "";
	preco_unitario: number | "";
	valor_total: number;
	observacao: string;
	data_movimentacao: string;
	ativo: boolean;
}

export default function FormMovimentacao({ movimentacoes = [], onSuccess }: FormMovimentacaoProps) {
	const [formData, setFormData] = useState<FormData>({
		id_produto: "",
		id_movimentacao_origem: "",
		motivo_movimentacao: "",
		tipo_movimentacao: "entrada",
		quantidade: "",
		preco_unitario: "",
		valor_total: 0,
		observacao: "",
		data_movimentacao: new Date().toISOString().slice(0, 10),
		ativo: true,
	});
	const [erroTela, setErroTela] = useState<string | null>(null);

	const calcularValorTotal = useMemo(() => {
		const q = Number(formData.quantidade) || 0;
		const p = Number(formData.preco_unitario) || 0;
		return q * p;
	}, [formData.quantidade, formData.preco_unitario]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = e.target;

		let val: any = value;

		if (type === "checkbox") {
			val = (e.target as HTMLInputElement).checked;
		} else if (type === "number") {
			val = value === "" ? "" : Number(value);
		}

		setFormData((prev) => ({
			...prev,
			[name]: val,
			valor_total: name === "quantidade" || name === "preco_unitario" ? (Number(name === "quantidade" ? val : prev.quantidade) * Number(name === "preco_unitario" ? val : prev.preco_unitario)) : prev.valor_total,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErroTela(null);

		if (!formData.id_produto || !formData.quantidade || !formData.tipo_movimentacao) {
			const erroValidacao = "Preencha Produto, Tipo e Quantidade.";
			console.error("Erro de validação:", erroValidacao, formData);
			setErroTela(`Erro ao cadastrar: ${erroValidacao}`);
			return;
		}

		const payload = {
			id_produto: Number(formData.id_produto),
			id_movimentacao_origem: formData.id_movimentacao_origem ? Number(formData.id_movimentacao_origem) : undefined,
			motivo_movimentacao: formData.motivo_movimentacao,
			tipo_movimentacao: formData.tipo_movimentacao,
			quantidade: Number(formData.quantidade),
			preco_unitario: Number(formData.preco_unitario) || 0,
			valor_total: calcularValorTotal,
			observacao: formData.observacao,
			data_movimentacao: formData.data_movimentacao,
			ativo: formData.ativo,
		};

		try {
			const resposta = await MovimentacaoRequests.criar(payload as any);

			if (!resposta) {
				throw new Error("O servidor recusou o cadastro de movimentação.");
			}

			alert("Movimentação cadastrada com sucesso!");
			setFormData({
				id_produto: "",
				id_movimentacao_origem: "",
				motivo_movimentacao: "",
				tipo_movimentacao: "entrada",
				quantidade: "",
				preco_unitario: "",
				valor_total: 0,
				observacao: "",
				data_movimentacao: new Date().toISOString().slice(0, 10),
				ativo: true,
			});

			if (onSuccess) onSuccess();
		} catch (error) {
			console.error("Erro ao cadastrar movimentacao:", error);
			const erroApi = error as {
				response?: { data?: { message?: string } };
				message?: string;
			};
			setErroTela(
				"Erro ao cadastrar: " + (erroApi.response?.data?.message || erroApi.message || "Erro desconhecido")
			);
		}
	};

	return (
		<div>
			<div className="product-form-wrapper">
				<div className="product-form-card">
					<h2>Cadastro de Movimentações</h2>

					{erroTela && <div className="product-form-error">{erroTela}</div>}

					<form onSubmit={handleSubmit}>
						<div className="product-form-section">
							<div className="product-form-group">
								<label>ID do Produto:</label>
								<input type="number" name="id_produto" value={formData.id_produto as any} onChange={handleChange} required />
							</div>

							<div className="product-form-group">
								<label>Origem (opcional):</label>
								<input type="number" name="id_movimentacao_origem" value={formData.id_movimentacao_origem as any} onChange={handleChange} />
							</div>
						</div>

						<div className="product-form-section full">
							<div className="product-form-group">
								<label>Motivo:</label>
								<input type="text" name="motivo_movimentacao" value={formData.motivo_movimentacao} onChange={handleChange} />
							</div>
						</div>

						<div className="product-form-section">
							<div className="product-form-group">
								<label>Tipo:</label>
								<select name="tipo_movimentacao" value={formData.tipo_movimentacao} onChange={handleChange}>
									<option value="entrada">Entrada</option>
									<option value="saida">Saída</option>
								</select>
							</div>

							<div className="product-form-group">
								<label>Quantidade:</label>
								<input type="number" name="quantidade" value={formData.quantidade as any} onChange={handleChange} required />
							</div>
						</div>

						<div className="product-form-section">
							<div className="product-form-group">
								<label>Preço unitário (R$):</label>
								<input type="number" step="0.01" name="preco_unitario" value={formData.preco_unitario as any} onChange={handleChange} />
							</div>

							<div className="product-form-group">
								<label>Valor total (R$):</label>
								<input type="number" readOnly value={calcularValorTotal.toFixed(2)} />
							</div>
						</div>

						<div className="product-form-section full">
							<div className="product-form-group">
								<label>Observação:</label>
								<textarea name="observacao" value={formData.observacao} onChange={handleChange} />
							</div>
						</div>

						<div className="product-form-section">
							<div className="product-form-group">
								<label>Data:</label>
								<input type="date" name="data_movimentacao" value={formData.data_movimentacao} onChange={handleChange} />
							</div>

							<div className="product-form-group">
								<label>Status:</label>
								<select name="ativo" value={formData.ativo ? "1" : "0"} onChange={(e) => setFormData({ ...formData, ativo: e.target.value === "1" })}>
									<option value="1">Ativo</option>
									<option value="0">Inativo</option>
								</select>
							</div>
						</div>

						<div className="product-form-actions">
							<button type="submit" className="product-btn-submit">Cadastrar Movimentação</button>
							<button type="reset" className="product-btn-reset" onClick={() => setFormData({ id_produto: "", id_movimentacao_origem: "", motivo_movimentacao: "", tipo_movimentacao: "entrada", quantidade: "", preco_unitario: "", valor_total: 0, observacao: "", data_movimentacao: new Date().toISOString().slice(0,10), ativo: true })}>Limpar</button>
						</div>
					</form>
				</div>
			</div>

			{movimentacoes.length > 0 && (
				<section className="produtos-cadastrados">
					<h3>Movimentações Cadastradas ({movimentacoes.length})</h3>
					<div className="produtos-grid">
						{movimentacoes.map((item, index) => (
							<div key={item.id_movimentacao || index} className="product-card">
								<h4>{item.motivo_movimentacao || `Movimentação #${item.id_movimentacao ?? index}`}</h4>
								<p><strong>Tipo:</strong> {item.tipo_movimentacao}</p>
								<p><strong>Quantidade:</strong> {item.quantidade ?? 0}</p>
								<p><strong>Valor total:</strong> R$ {Number(item.valor_total ?? 0).toFixed(2)}</p>
								<p>{item.observacao || "Sem observação."}</p>
							</div>
						))}
					</div>
				</section>
			)}
		</div>
	);
}

