import React from 'react';
import './LandingView.css';

interface LandingViewProps {
  onEnterApp: () => void;
}

const LandingView: React.FC<LandingViewProps> = ({ onEnterApp }) => {
  return (
    <div className="landing-container">

      {/* ─── NAVBAR ─── */}
      <nav>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo">
            <img src="/sol_com_risco_em_baixo-removebg-preview.png" alt="Solara Estética Logo" style={{ width: '64px', height: '64px' }} />
            <div className="nav-logo-text">
              <span className="assistente">Solara</span>
              <span className="solara">Estética</span>
              <span className="tagline">Atendimento Digital</span>
            </div>
          </a>
          <ul className="nav-links">
            <li><a href="#problema">Problema</a></li>
            <li><a href="#solucao">Solução</a></li>
            <li><a href="#como-funciona">Como Funciona</a></li>
            <li><a href="#precos">Planos</a></li>
            <li>
              <button onClick={onEnterApp} className="btn-nav">
                Acessar o Sistema
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section id="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-label fade-up">🏥 Para clínicas de estética que levam o atendimento a sério</div>
            <h1 className="fade-up delay-1">
              Solara — a atendente digital que <span>organiza o atendimento</span> da sua clínica de estética.
            </h1>
            <p className="hero-sub fade-up delay-2">
              O Solara Estética responde clientes no WhatsApp, agenda procedimentos, confirma horários e organiza todo o fluxo de atendimento automaticamente — enquanto sua equipe se dedica ao que realmente importa: os clientes.
            </p>
            <ul className="hero-benefits fade-up delay-3">
              <li>Atendimento automático 24h no WhatsApp</li>
              <li>Agendamento inteligente de procedimentos</li>
              <li>Confirmações e lembretes automáticos</li>
              <li>Painel completo de gestão em tempo real</li>
            </ul>
            <div className="hero-btns fade-up delay-4">
              <button onClick={onEnterApp} className="btn-primary">
                🚀 Agendar Demonstração
              </button>
              <a href="#como-funciona" className="btn-white">Ver como funciona →</a>
            </div>
            <p className="hero-support-text fade-up">Configuração simples. Sem necessidade de equipe técnica.</p>
          </div>
          <div className="hero-img fade-up delay-2">
            <div className="hero-mockup">
              <div className="mockup-header">
                <div className="mockup-dots"><span></span><span></span><span></span></div>
                <span className="mockup-title">Solara Estética — Painel</span>
              </div>
              <div className="mockup-body">
                <div className="mockup-stat-row">
                  <div className="mockup-stat"><strong>142</strong><span>Procedimentos agendados</span></div>
                  <div className="mockup-stat"><strong>98%</strong><span>Confirmações</span></div>
                  <div className="mockup-stat"><strong>R$&nbsp;12k</strong><span>Receita protegida</span></div>
                </div>
                <div className="mockup-kanban">
                  <div className="kanban-col kanban-triagem">
                    <div className="kanban-col-title">📥 Triagem</div>
                    <div className="kanban-card">Ana S. — Botox</div>
                    <div className="kanban-card">João P. — Avaliação</div>
                  </div>
                  <div className="kanban-col kanban-aguardando">
                    <div className="kanban-col-title">⏳ Aguardando</div>
                    <div className="kanban-card">Maria L. — Preenchimento</div>
                  </div>
                  <div className="kanban-col kanban-finalizado">
                    <div className="kanban-col-title">✅ Finalizado</div>
                    <div className="kanban-card">Carlos M. — Limpeza de Pele</div>
                    <div className="kanban-card">Rita O. — Harmonização</div>
                  </div>
                </div>
                <div className="mockup-wpp-row">
                  <div className="mockup-wpp-indicator">
                    <span className="wpp-dot"></span>
                    Solara IA ativa — 3 atendimentos em curso
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LOGOTIPOS / TRUST BAR ─── */}
      <section id="trustbar">
        <div className="container">
          <div className="trustbar-inner">
            <span className="trustbar-label">Tecnologia integrada com</span>
            <div className="trustbar-logos">
              <div className="trustbar-logo">💬 WhatsApp</div>
              <div className="trustbar-dot"></div>
              <div className="trustbar-logo">🗓️ Google Agenda</div>
              <div className="trustbar-dot"></div>
              <div className="trustbar-logo">🤖 Gemini AI</div>
              <div className="trustbar-dot"></div>
              <div className="trustbar-logo">🔒 LGPD</div>
              <div className="trustbar-dot"></div>
              <div className="trustbar-logo">📊 Analytics</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEMA ─── */}
      <section id="problema" className="section-light">
        <div className="container">
          <div className="section-label-centered">
            <div className="section-label">⚠️ O Problema</div>
          </div>
          <h2 className="section-heading-center">
            O atendimento de muitas clínicas de estética ainda depende de mensagens, anotações e improviso.
          </h2>
          <div className="problema-cards">
            <div className="problema-card">
              <div className="problema-card-icon">📱</div>
              <h3>Mensagens acumuladas</h3>
              <p>O WhatsApp da clínica acumula mensagens sem resposta enquanto a equipe tenta dar conta do atendimento presencial.</p>
            </div>
            <div className="problema-card">
              <div className="problema-card-icon">⏳</div>
              <h3>Clientes sem resposta</h3>
              <p>Cada minuto de demora na resposta é uma oportunidade que escorrega silenciosamente para a concorrência.</p>
            </div>
            <div className="problema-card">
              <div className="problema-card-icon">📅</div>
              <h3>Procedimentos esquecidos</h3>
              <p>Agendamentos manuais e sem confirmação automática resultam em faltas e horários que ficam vazios na agenda.</p>
            </div>
            <div className="problema-card">
              <div className="problema-card-icon">📋</div>
              <h3>Agenda desorganizada</h3>
              <p>Sem um sistema centralizado, a agenda se transforma em um quebra-cabeça difícil de controlar no dia a dia.</p>
            </div>
          </div>
          <div className="problema-conclusion">
            <div className="conclusion-text">
              <p>O problema raramente é falta de clientes.</p>
              <p className="conclusion-bold">Na maioria das vezes, é falta de um sistema que organize o atendimento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOLUÇÃO ─── */}
      <section id="solucao" className="section-dark">
        <div className="container">
          <div className="section-label-centered">
            <div className="section-label teal">✅ A Solução</div>
          </div>
          <h2 className="section-heading-center light">
            Foi exatamente para resolver isso que o Solara Estética foi criado.
          </h2>
          <p className="section-sub-center">
            Solara é uma atendente digital inteligente que responde clientes, organiza agendamentos, confirma procedimentos e registra todas as interações automaticamente — todos os dias, sem parar.
          </p>
          <div className="solucao-features">
            <div className="solucao-feat">
              <div className="solucao-feat-number">01</div>
              <div className="solucao-feat-content">
                <h3>Atendimento automático no WhatsApp</h3>
                <p>Clientes recebem respostas imediatas e orientações iniciais sem precisar aguardar atendimento humano.</p>
              </div>
            </div>
            <div className="solucao-feat">
              <div className="solucao-feat-number">02</div>
              <div className="solucao-feat-content">
                <h3>Agendamento inteligente de procedimentos</h3>
                <p>O sistema consulta a agenda da clínica e oferece automaticamente os horários disponíveis para o cliente.</p>
              </div>
            </div>
            <div className="solucao-feat">
              <div className="solucao-feat-number">03</div>
              <div className="solucao-feat-content">
                <h3>Confirmações e lembretes automáticos</h3>
                <p>Clientes recebem confirmação e lembretes antes do procedimento, ajudando a reduzir faltas significativamente.</p>
              </div>
            </div>
            <div className="solucao-feat">
              <div className="solucao-feat-number">04</div>
              <div className="solucao-feat-content">
                <h3>Painel completo de gestão</h3>
                <p>Todas as interações, clientes e procedimentos ficam organizados em um único painel de controle intuitivo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMO FUNCIONA ─── */}
      <section id="como-funciona" className="section-light">
        <div className="container">
          <div className="section-label-centered">
            <div className="section-label">⚙️ Como Funciona</div>
          </div>
          <h2 className="section-heading-center">
            Como o Solara Estética organiza o atendimento da sua clínica.
          </h2>
          <p className="section-sub-center dark">
            Processo simples, automático e contínuo — do primeiro contato ao acompanhamento completo.
          </p>
          <div className="steps-premium">
            <div className="step-premium">
              <div className="step-premium-number">1</div>
              <div className="step-premium-connector"></div>
              <div className="step-premium-body">
                <h3>O cliente entra em contato</h3>
                <p>O cliente envia uma mensagem pelo WhatsApp da clínica e é atendido imediatamente pela Solara — sem espera, sem fila.</p>
              </div>
            </div>
            <div className="step-premium">
              <div className="step-premium-number">2</div>
              <div className="step-premium-connector"></div>
              <div className="step-premium-body">
                <h3>O sistema conduz o atendimento</h3>
                <p>A Solara responde dúvidas iniciais, coleta informações do cliente e apresenta horários disponíveis para agendamento.</p>
              </div>
            </div>
            <div className="step-premium">
              <div className="step-premium-number">3</div>
              <div className="step-premium-connector"></div>
              <div className="step-premium-body">
                <h3>A consulta é registrada automaticamente</h3>
                <p>O sistema agenda o procedimento, registra o cliente no banco de dados e envia confirmação imediata por WhatsApp.</p>
              </div>
            </div>
            <div className="step-premium">
              <div className="step-premium-number">4</div>
              <div className="step-premium-body">
                <h3>A clínica acompanha tudo no painel</h3>
                <p>A equipe acompanha agenda, clientes e procedimentos em um painel simples, visual e organizado em tempo real.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BANNER ─── */}
      <section id="stats" className="section-accent">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <strong>-40%</strong>
              <span>Redução de faltas com lembretes automáticos</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <strong>24h</strong>
              <span>Atendimento ininterrupto via WhatsApp</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <strong>98%</strong>
              <span>Taxa de confirmação de procedimentos</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <strong>3×</strong>
              <span>Mais capacidade sem aumentar equipe</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FUNCIONALIDADES ─── */}
      <section id="funcionalidades" className="section-light">
        <div className="container">
          <div className="section-label-centered">
            <div className="section-label">🛠️ Funcionalidades</div>
          </div>
          <h2 className="section-heading-center">
            Tudo que sua clínica precisa. Em um único sistema.
          </h2>
          <div className="feat-grid-premium">
            <div className="feat-premium-card feat-main">
              <div className="feat-premium-icon">💬</div>
              <h3>Atendimento Automático no WhatsApp</h3>
              <p>Clientes recebem respostas imediatas 24 horas por dia. A Solara conduz a conversa, coleta dados e agenda — sem intervenção humana.</p>
              <div className="feat-premium-tag">Core Feature</div>
            </div>
            <div className="feat-premium-card">
              <div className="feat-premium-icon">📅</div>
              <h3>Agendamento Inteligente</h3>
              <p>O sistema consulta disponibilidade em tempo real e oferece horários automaticamente ao cliente.</p>
            </div>
            <div className="feat-premium-card">
              <div className="feat-premium-icon">🔔</div>
              <h3>Lembretes Automáticos</h3>
              <p>Confirmações e lembretes são enviados no momento certo para reduzir faltas e manter a agenda cheia.</p>
            </div>
            <div className="feat-premium-card">
              <div className="feat-premium-icon">📊</div>
              <h3>Painel de Gestão</h3>
              <p>Visão completa de todos os clientes, procedimentos e métricas de performance em tempo real.</p>
            </div>
            <div className="feat-premium-card">
              <div className="feat-premium-icon">📋</div>
              <h3>Kanban Visual</h3>
              <p>Fluxo de atendimento visual com colunas por status: Triagem, Aguardando, Em Atendimento, Finalizado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SEGURANÇA ─── */}
      <section id="seguranca" className="section-dark">
        <div className="container seguranca-layout">
          <div className="seguranca-content">
            <div className="section-label teal">🔒 Segurança & LGPD</div>
            <h2 className="light">Segurança e privacidade no padrão que clínicas precisam.</h2>
            <p>
              Todas as informações registradas no Solara Estética são armazenadas em banco de dados seguro, com criptografia e seguindo as diretrizes da LGPD. Os dados dos clientes são tratados com o nível de segurança exigido para operações de clínicas de estética.
            </p>
            <div className="seguranca-checklist">
              <div className="seguranca-check-item">
                <div className="check-badge">✓</div>
                <div>
                  <strong>Criptografia de ponta a ponta</strong>
                  <span>Toda comunicação entre sistema e cliente é criptografada</span>
                </div>
              </div>
              <div className="seguranca-check-item">
                <div className="check-badge">✓</div>
                <div>
                  <strong>Conformidade total com a LGPD</strong>
                  <span>Tratamento de dados em conformidade com a legislação brasileira</span>
                </div>
              </div>
              <div className="seguranca-check-item">
                <div className="check-badge">✓</div>
                <div>
                  <strong>Servidores no Brasil</strong>
                  <span>Dados armazenados localmente com backup diário automatizado</span>
                </div>
              </div>
              <div className="seguranca-check-item">
                <div className="check-badge">✓</div>
                <div>
                  <strong>Controle de acesso por perfil</strong>
                  <span>Permissões granulares por função dentro da clínica</span>
                </div>
              </div>
            </div>
          </div>
          <div className="seguranca-visual-premium">
            <div className="seg-shield-wrap">
              <div className="seg-shield-glow"></div>
              <div className="seg-shield-icon">🛡️</div>
            </div>
            <div className="seg-badges">
              <div className="seg-badge"><span>✓</span> LGPD Compliant</div>
              <div className="seg-badge"><span>✓</span> SSL 256-bit</div>
              <div className="seg-badge"><span>✓</span> Backup Diário</div>
              <div className="seg-badge"><span>✓</span> Uptime 99.9%</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PERDA DE OPORTUNIDADES ─── */}
      <section id="perda" className="section-light">
        <div className="container">
          <div className="section-label-centered">
            <div className="section-label">📉 O Custo Real</div>
          </div>
          <h2 className="section-heading-center">
            Quando o atendimento não é organizado, a clínica perde oportunidades todos os dias.
          </h2>
          <div className="perda-vs-layout">
            <div className="perda-col">
              <div className="perda-col-header sem-solara">Sem o Solara Estética</div>
              <div className="perda-item-row">
                <span className="perda-x">✗</span>
                <span>Mensagens que ficam sem resposta</span>
              </div>
              <div className="perda-item-row">
                <span className="perda-x">✗</span>
                <span>Clientes que desistem de agendar</span>
              </div>
              <div className="perda-item-row">
                <span className="perda-x">✗</span>
                <span>Procedimentos esquecidos na agenda</span>
              </div>
              <div className="perda-item-row">
                <span className="perda-x">✗</span>
                <span>Equipe sobrecarregada com tarefas repetitivas</span>
              </div>
              <div className="perda-item-row">
                <span className="perda-x">✗</span>
                <span>Faturamento perdido sem rastrear</span>
              </div>
            </div>
            <div className="perda-divider">
              <div className="perda-divider-line"></div>
              <div className="perda-divider-vs">VS</div>
              <div className="perda-divider-line"></div>
            </div>
            <div className="perda-col com-solara">
              <div className="perda-col-header com-solara-header">Com o Solara Estética</div>
              <div className="perda-item-row">
                <span className="perda-check">✓</span>
                <span>Respostas imediatas, atendimento 24h</span>
              </div>
              <div className="perda-item-row">
                <span className="perda-check">✓</span>
                <span>Agendamento guiado automático via IA</span>
              </div>
              <div className="perda-item-row">
                <span className="perda-check">✓</span>
                <span>Lembretes automáticos antes do procedimento</span>
              </div>
              <div className="perda-item-row">
                <span className="perda-check">✓</span>
                <span>Equipe focada no atendimento presencial</span>
              </div>
              <div className="perda-item-row">
                <span className="perda-check">✓</span>
                <span>Faturamento rastreado em tempo real</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PREÇOS ─── */}
      <section id="precos" className="section-dark">
        <div className="container">
          <div className="section-label-centered">
            <div className="section-label teal">💳 Planos</div>
          </div>
          <h2 className="section-heading-center light">Planos para clínicas de estética.</h2>
          <p className="section-sub-center">Escolha o plano ideal e comece a organizar o atendimento hoje mesmo.</p>
          <div className="precos-grid">
            <div className="preco-card">
              <div className="preco-card-header">
                <h3>Essencial</h3>
                <p>Para clínicas pequenas</p>
              </div>
              <div className="preco-valor">
                <span className="moeda">R$</span>
                <span className="valor">149</span>
                <span className="periodo">/mês</span>
              </div>
              <p className="preco-limite">1 a 2 especialistas</p>
              <ul className="preco-features">
                <li><span>✔</span> Atendimento automático WhatsApp</li>
                <li><span>✔</span> Agendamento inteligente</li>
                <li><span>✔</span> Confirmações automáticas</li>
                <li><span>✔</span> Painel de gestão básico</li>
              </ul>
              <button onClick={onEnterApp} className="btn-preco-outline">Começar Agora</button>
            </div>
            <div className="preco-card popular">
              <div className="badge-popular">MAIS POPULAR</div>
              <div className="preco-card-header">
                <h3>Profissional</h3>
                <p>O melhor custo-benefício</p>
              </div>
              <div className="preco-valor">
                <span className="moeda">R$</span>
                <span className="valor">249</span>
                <span className="periodo">/mês</span>
              </div>
              <p className="preco-limite">3 a 5 especialistas</p>
              <ul className="preco-features">
                <li><span>✔</span> Tudo do plano Essencial</li>
                <li><span>✔</span> Kanban de gestão visual</li>
                <li><span>✔</span> Relatórios de NPS e faltas</li>
                <li><span>✔</span> Integração Solara AI completa</li>
              </ul>
              <button onClick={onEnterApp} className="btn-preco-primary">Começar Agora</button>
            </div>
            <div className="preco-card">
              <div className="preco-card-header">
                <h3>Clínica</h3>
                <p>Para grandes operações</p>
              </div>
              <div className="preco-valor">
                <span className="moeda">R$</span>
                <span className="valor">349</span>
                <span className="periodo">/mês</span>
              </div>
              <p className="preco-limite">6 a 10 especialistas</p>
              <ul className="preco-features">
                <li><span>✔</span> Tudo do plano Profissional</li>
                <li><span>✔</span> Insights avançados de IA</li>
                <li><span>✔</span> Campanhas automáticas</li>
                <li><span>✔</span> Suporte prioritário dedicado</li>
              </ul>
              <button onClick={onEnterApp} className="btn-preco-outline">Começar Agora</button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section id="cta" className="section-cta">
        <div className="container">
          <div className="cta-box">
            <div className="cta-glow"></div>
            <div className="cta-content">
              <div className="section-label teal" style={{ display: 'inline-flex', marginBottom: '28px' }}>🚀 Pronto para começar?</div>
              <h2>Veja como o Solara Estética pode transformar o atendimento da sua clínica.</h2>
              <p>Automatize a comunicação com clientes, organize sua agenda e acompanhe todo o atendimento em um único sistema.</p>
              <button onClick={onEnterApp} className="btn-cta-primary">
                Agendar Demonstração Gratuita →
              </button>
              <span className="cta-sub">Implementação simples e rápida para clínicas.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/sol_com_risco_em_baixo-removebg-preview.png" alt="Solara Estética Logo" style={{ width: '64px', height: '64px' }} />
              <div className="footer-logo-text">
                <span className="assistente">Solara</span>
                <span className="solara">Estética</span>
              </div>
            </div>
            <p>Atendente digital inteligente para clínicas de estética. Tecnologia que organiza, automatiza e transforma o atendimento.</p>
          </div>
          <div className="footer-col">
            <h4>Produto</h4>
            <ul>
              <li><button onClick={onEnterApp} className="footer-link-btn">Acessar Painel</button></li>
              <li><a href="#funcionalidades">Funcionalidades</a></li>
              <li><a href="#como-funciona">Como Funciona</a></li>
              <li><a href="#precos">Planos</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Empresa</h4>
            <ul>
              <li><a href="#">Contato</a></li>
              <li><a href="#">Termos de Uso</a></li>
              <li><a href="#">Privacidade & LGPD</a></li>
              <li><a href="#">Suporte</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Solara Estética. Todos os direitos reservados.</p>
          <div className="footer-badge">🔒 LGPD Compliant · Criptografia Ativa</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingView;
