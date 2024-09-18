import React from 'react';
import AuthProvider from "../../AuthProvider";

const KnowledgeCentre = () => {
  const moduleContents = [
    {
      id: 1,
      title: 'Module 1 - Introduction to ESG',
      content: `
        <h2>What is environmental, social and governance (ESG)?</h2>
        <p>Environmental, social and governance (ESG) is a framework used to assess an organization's business practices and performance on various sustainability and ethical issues. It also provides a way to measure business risks and opportunities in those areas. In capital markets, some investors use ESG criteria to evaluate companies and help determine their investment plans, a practice known as ESG investing.</p>
        
        <p>While sustainability, ethics and corporate governance are generally considered to be non-financial performance indicators, the role of an ESG program is to ensure accountability and the implementation of systems and processes to manage a company's impact, such as its carbon footprint and how it treats employees, suppliers and other stakeholders. ESG initiatives also contribute to broader business sustainability efforts that aim to position companies for long-term success based on responsible corporate management and business strategies.
        These are some of the key factors commonly considered in ESG initiatives.</p>
        
        <h4>What are the criteria for ESG?</h4>
        <p>As the number of ESG funds for managing investments rises, business and IT leaders in companies increasingly are paying attention to ESG as a functional approach to doing business. Each aspect of ESG plays an important role in the effort to increase a company's focus on sustainable and ethical practices. Here are details on common ESG criteria used by companies and investors.</p>
        
        <h4>Environmental</h4>
        <p>Environmental factors involve considerations of an organization's overall impact on the environment and the potential risks and opportunities it faces because of environmental issues, such as climate change and measures to protect natural resources. Examples of environmental factors that can be ESG criteria include the following:</p>
        <ul>
        <li>Energy consumption and efficiency.</li>
        <li>Carbon footprint, including greenhouse gas emissions.</li>
        <li>Waste management.</li>
        <li>Air and water pollution.</li>
        <li>Biodiversity loss.</li>
        <li>Deforestation.</li>
        <li>Natural resource depletion.</li>
        </ul>
        <h4>Social</h4>
        <p>Social factors address how a company treats different groups of people -- employees, suppliers, customers, community members and more. The criteria used include these examples:</p>
        <ul>
        <li>Fair pay for employees, including a living wage.</li>
        <li>Diversity, equity and inclusion (DEI) programs.</li>
        <li>Employee experience and engagement.</li>
        <li>Workplace health and safety.</li>
        <li>Data protection and privacy policies.</li>
        <li>Fair treatment of customers and suppliers.</li>
        <li>Customer satisfaction levels.</li>
        <li>Community relations, including the organization's connection to and impact on the local communities in which it operates.</li>
        <li>Funding of projects or institutions that help poor and underserved communities.</li>
        <li>Support for human rights and labor standards.</li>
        </ul>
        <h4>Governance</h4>
        <p>Governance factors examine how a company polices itself, focusing on internal controls and practices to maintain compliance with regulations, industry best practices and corporate policies. Examples include the following:</p>
        <ul>
        <li>Company leadership and management.</li>
        <li>Board composition, including its diversity and structure.</li>
        <li>Executive compensation policies.</li>
        <li>Financial transparency and business integrity.</li>
        <li>Regulatory compliance and risk management initiatives.</li>
        <li>Ethical business practices.</li>
        <li>Rules on corruption, bribery, conflicts of interest, and political donations and lobbying.</li>
        <li>Whistleblower programs.</li>
        </ul>
        `,
    },
    {
      id: 2,
      title: 'Module 2 - Evolution of ESG',
      content: `
      <h2>Evolution of ESG</h2>
      <p>Socially responsible investing practices began to take shape in the 1960s and 1970s. For example, activists started pushing academic institutions and companies to divest their stock holdings in organizations that did business in South Africa to protest against the apartheid system then in place there.</p>

<p>In 1971, two United Methodist ministers opposed to the Vietnam War launched the Pax Fund, the first U.S. mutual fund open to the public that used social and environmental criteria in investment decisions. Initially, the fund avoided investing in weapons manufacturers -- it later added tobacco, alcohol and gambling companies and heavy polluters to the list. Still in existence, it's now owned by London-based Impax Asset Management and called the Impax Sustainable Allocation Fund.</p>

<p>The South Africa divestment campaign accelerated in the 1980s, and a broader push to divest holdings in tobacco makers began among public health organizations, universities and public pension funds. In 1990, investment research firm KLD Research & Analytics created the Domini 400 Social Index to help guide socially conscious investors -- one of the first SRI indexes, it included 400 companies that prioritized social and environmental responsibility. It's now called the MSCI KLD 400 Social Index and owned by MSCI Inc., which acquired KLD in 2010.</p>
<p>In 1995, the Washington-based Social Investment Forum Foundation, now known as the US SIF Foundation, published a report on sustainable investing trends in the U.S. that said $639 billion in total assets were being managed using SRI strategies. The latest version of the now-biennial report, published in December 2022, put that figure at $8.4 trillion for ESG and sustainable investments overall, which US SIF said amounted to 12.6% of all the investment assets under professional management in the U.S.</p>

<p>The sustainable investing movement gained more momentum with the founding of the Carbon Disclosure Project in 2000. Now known simply as CDP, it created a platform for companies to report on their carbon emissions and footprints. Two years later, a group of 35 institutional investors requested climate disclosures from 500 large companies, which helped to normalize such reports.</p>

<p>The term ESG was popularized by "Who Cares Wins," a report first published in 2004 by a group of 18 banks and investment firms that was organized by the United Nations. The report offered recommendations on how to better incorporate ESG issues into asset management, brokerage services and related research activities. It was followed a year later by the so-called Freshfields Report, another U.N.-backed document that was prepared by the London-based law firm Freshfields Bruckhaus Deringer and outlined a legal framework for integrating ESG criteria into investment decisions.</p>

<p>The U.N. then asked another group of institutional investors to develop the Principles for Responsible Investment (PRI), a set of six ESG investing principles that was published in 2006 and continues to be promoted by the PRI Association. The evolution and growth of ESG investing picked up pace from there with the formation of more ESG reporting initiatives, including the Climate Disclosure Standards Board (CDSB) in 2007, the Sustainability Accounting Standards Board (SASB) in 2011, the Taskforce on Climate-Related Financial Disclosures in 2015 and the Workforce Disclosure Initiative in 2016.</p>

<p>More recently, key developments include the following:</p>
<ul>
<li>2020: The World Economic Forum and the Big Four accounting firms released a standardized set of stakeholder capitalism metrics to make ESG reporting by companies more consistent and easier to compare.</li>
<li>2021: The European Union's Sustainable Finance Disclosure Regulation went into effect, creating new sustainability reporting requirements for financial services and investment firms.</li>
<li>2022: The U.S. Securities and Exchange Commission similarly proposed rules amendments with more detailed disclosure and reporting requirements for investment funds that use ESG criteria. Also, the CDSB and the SASB standards were consolidated into the International Financial Reporting Standards (IFRS) Foundation, which plans to create a unified set of IFRS Sustainability Disclosure Standards.</li>
<li>2023: The EU's Corporate Sustainability Reporting Directive went into force in January. Eventually, it will require 50,000 companies to file annual reports on their business risks and opportunities related to social and environmental issues and how their operations affect people and the environment.</li>
<p>Hundreds of ESG funds are now available to investors in the U.S. alone. ESG investing has become a political issue, though. For example, Congress in March 2023 approved a resolution proposed by Republicans to block a 2022 federal rule that allows retirement fund managers to consider ESG factors in their investment decisions. However, President Biden vetoed the measure, leaving the rule in place.</p> `,
    },
    {
      id: 3,
      title: 'Module 3 - Disclosure and Regulations',
      content: `
      <h2>Disclosure & Regulations</h2>
      <p>The first ten years of the 21st century has seen growth in the ESG defined investment market. Not only do most of the world's big banks have departments and divisions exclusively addressing Responsible Investment but boutique firms specialising in advising and consulting on environmental, social, and governance related investments are proliferating. One of the major aspects of the ESG side of the insurance market which leads to this tendency to proliferation is the essentially subjective nature of the information on which investment selection can be made. By definition ESG data is qualitative; it is non-financial and not readily quantifiable in monetary terms. The investment market has long dealt with these intangibles—such variables as goodwill have been widely accepted as contributing to a company's value. But the ESG intangibles are not only highly subjective they are also particularly difficult to quantify and more importantly verify. A lack of clear standards and transparent monitoring has led to fears that ESG avowals mainly serve purposes of greenwashing and other company public relations objectives, while distracting from more substantive initiatives to improve environment and society.</p>

      <p>One of the major issues in the ESG area is disclosure. Environmental risks created by business activities have actual or potential negative impact on air, land, water, ecosystems, and human health. The information on which an investor makes their decisions on a financial level is fairly simply gathered. The company's accounts can be examined, and although the accounting practices of corporate business are coming increasingly into disrepute after a spate of recent financial scandals, the figures are for the most part externally verifiable. With ESG considerations, the practice has been for the company under examination to provide its own figures and disclosures. These have seldom been externally verified and the lack of universal standards and regulation in the areas of environmental and social practice mean that the measurement of such statistics is subjective to say the least.</p>
      
      <p>One of the solutions put forward to the inherent subjectivity of ESG data is the provision of universally accepted standards for the measurement of ESG factors. Such organizations as the ISO (International Organization for Standardization) provide highly researched and widely accepted standards for many of the areas covered.[85] Some investment consultancies, such as Probus-Sigma have created methodologies for calculating the ratings for an ESG based Ratings Index that is both based on ISO standards and externally verified,[86] but the formalization of the acceptance of such standards as the basis for calculating and verifying ESG disclosures is by no means universal.</p>
      
      <p>The corporate governance side of the matter has received rather more in the way of regulation and standardization as there is a longer history of regulation in this area. In 1992 the London Stock Exchange and the Financial Reporting Commission set up the Cadbury Commission to investigate the series of governance failures that had plagued the City of London such as the bankruptcies of BCCI, Polly Peck, and Robert Maxwell's Mirror Group. The conclusions that the commission reached were compiled in 2003 into the Combined Code on Corporate Governance which has been widely accepted (if patchily applied) by the financial world as a benchmark for good governance practices.</p>
      
      <p>In the interview for Yahoo! Finance Francis Menassa (JAR Capital) says, that "the EU's 2014 Non-Financial Reporting Directive will apply to every country on a national level to implement and requires large companies to disclose non-financial and diversity information. This also includes providing information on how they operate and manage social and environmental challenges. The aim is to help investors, consumers, policy makers, and other stakeholders to evaluate the non-financial performance of large companies. Ultimately, the Directive encourages European companies to develop a responsible approach to business".</p>
      
      <p>One of the key areas of concern in the discussion as to the reliability of ESG disclosures is the establishment of credible ratings for companies as to ESG performance. The world's financial markets have all leapt to provide ESG relevant ratings indexes, the Dow Jones Sustainability Index, the FTSE4Good Index (which is co-owned by the London Stock Exchange and Financial Times[89]), Bloomberg ESG data,[90] the MSCI ESG Indices[91] and the GRESB benchmarks.</p>
      
      <p>European regulators have introduced concrete rules to deal with the problem of greenwashing. These include a package of legislative measures arising from the European Commission's Action Plan on Sustainable Finance.</p>

        `,
    },{
      id: 4,
      title: 'Module 4 - Educating businesses with ESG',
      content: `
      <h2>What Does ESG Mean for a Business?</h2>
      <p>Adopting ESG principles means that corporate strategy focuses on the three pillars of the environment, social, and governance. This means taking measures to lower pollution, CO2 output, and reduce waste. It also means having a diverse and inclusive workforce, at the entry-level and all the way up to the board of directors. ESG may be costly and time-consuming to undertake, but can also be rewarding into the future for those that carry it through.</p>
      <h4>How Is ESG Investing Different From Sustainable Investing?</h4>
      <p>ESG and sustainability are closely related. ESG investing screens companies based on criteria related to being pro-social, environmentally friendly, and with good corporate governance. Together, these features can lead to sustainability. ESG, therefore, looks at how a company's management and stakeholders make decisions; sustainability considers the impact of those decisions on the world.</p>
      <h4>How Do I Know Which Investments Are ESG?</h4>
      <p>Several financial firms have come out with ESG ratings and scoring systems in recent years. For instance, MSCI has come out with a ratings scheme covering more than 8,500 companies around the world, giving them scores and letter grades based on their compliance with ESG standards and initiatives. Several other companies like Morningstar have also released ESG scores for publicly-traded companies.</p>
      <h4>Pros of ESG Investing</h4>
<p>Some have argued that, in addition to their social value, ESG criteria can help investors avoid the blowups that occur when companies operating in a risky or unethical manner are ultimately held accountable for its consequences. Examples include BP's (BP) 2010 Gulf of Mexico oil spill and Volkswagen's emissions scandal, which rocked the companies' stock prices and cost them billions of dollars.</p>

<p>As ESG-minded business practices gain more traction, investment firms are increasingly tracking their performance. Financial services companies such as JPMorgan Chase (JPM), Wells Fargo (WFC), and Goldman Sachs (GS) have published annual reports that extensively review their ESG approaches and the bottom-line results.</p>

<p>The ultimate value of ESG investing will depend on whether they encourage companies to drive real change for the common good, or merely check boxes and publish reports.</p>
<p>That, in turn, will depend on whether the investment flows follow ESG tenets that are realistic, measurable, and actionable.</p>
<h4>Cons of ESG Investing</h4>
<p>The downside of ESG investing is that you will not be able to hold the full universe of stocks available in the market. After all, tobacco and defense, two industries avoided by many ESG investors, have historically produced well-above-average market returns and can buck recessionary trends. In other words, U.S. investors may be sacrificing a small amount of returns in exchange for making investments that fit their values.</p>
<p>Many ESG investors are willing to make that tradeoff, though; according to a recent survey of Investopedia and Treehugger readers, nearly half of ESG investors said they’d be willing to take a 10% loss over a five-year period to invest in a company that “aligns exceptionally against ESG standards.” But 74% of respondents said that valuation/price was “very or extremely important to them.” This indicates that the average ESG-friendly investment trades at a premium, making it a relatively more expensive investment style.</p>
      `,
    },
    {
      id: 5,
      title: 'Module 5 - Alternatives of ESG Investing',
      content: `
      <h2>Alternative of ESG Rating</h2>
      <p>While ESG investing is now the most prominent form of sustainable investing overall, it isn't the only option for those interested in similar approaches. Although ESG investing and the following alternatives are often talked about interchangeably, some differences exist:</p>
<ul>
<li>Socially responsible investing (SRI): SRI focuses specifically on investments in organizations that match an investor's environmental, ethical and social values. For example, it excludes companies that manufacture certain products or profit from practices that harm the environment. SRI concentrates on the investor's values above a company's financial performance. Comparatively, ESG investing strategies focus on high standards of corporate behavior but often also consider business performance together with ESG criteria. In addition, ESG investing typically is based on more quantitative data because of the use of ESG scores and metrics.</li>
<li>Impact investing: This strategy focuses on helping an organization achieve specific goals that have social or environmental benefits. For example, impact investing could support a company that is working to develop renewable energy technology or promises to donate a percentage of its profits to charitable groups. Impact investing can also help promote corporate social responsibility (CSR) initiatives in companies. CSR is a self-regulating approach that emphasizes doing good and taking positive actions, such as a shoe company giving away a pair of shoes for each pair purchased.</li>

<li>Conscious capitalism: Unlike the previous strategies, conscious capitalism refers to a socially responsible economic and political philosophy. Conscious capitalism focuses on the premise that businesses should operate ethically while pursuing profits. The strategy emphasizes that an organization should serve its entire ecosystem, not just shareholders, other prominent stakeholders and company leadership.</li>
</ul>
<p>Other conscious capitalism beliefs include the following:</p>
<ul>
<li>Organizations should have a higher purpose beyond pure profits to inspire and engage their key stakeholders.</li> 
<li>The focus should be on the entire business ecosystem to create and optimize value for all stakeholders.</li>
<li>Conscious leadership follows the collective we vs. me mentality to drive the business.</li>
</ul>     
        `,
    },
   
    // Add other modules as needed
  ];

  return (
    <div className="container-fluid mt-2">
    <div className="row">
      {/* Sidebar */}
      <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-purple sidebar position-fixed" style={{ height: '100%', overflowY: 'auto' }}>
          <div className="position-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <h4 className="nav-link text-white">Modules</h4>
              </li>
              {moduleContents.map((module) => (
                <li key={module.id} className="nav-item">
                  <a className="nav-link text-white" href={`#module-${module.id}`}>
                    {module.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="container-fluid">
            {moduleContents.map((module) => (
              <div
                key={module.id}
                id={`module-${module.id}`}
                className="card mb-3"
                style={{ backgroundColor: 'lavender', marginBottom: '10px' }}
              >
                <div className="card-body">
                  <div dangerouslySetInnerHTML={{ __html: module.content }} />
                </div>
              </div>
            ))}
          </div>
          {/* References */}
          <div id="module-6" className="card mb-3" style={{ backgroundColor: 'lavender', marginBottom: '10px' }}>
              <div className="card-body">
                <h3>References</h3>
              <ul>
                <li>
                  <a href="https://www.techtarget.com/whatis/definition/environmental-social-and-governance-ESG" target="_blank" rel="noopener noreferrer">TechTarget</a>
                </li>
                <li>
                  <a href="https://www.investopedia.com/terms/e/environmental-social-and-governance-esg-criteria.asp" target="_blank" rel="noopener noreferrer">Investopedia</a>
                </li>
                <li>
                  <a href="https://corporatefinanceinstitute.com/resources/esg/esg-environmental-social-governance/" target="_blank" rel="noopener noreferrer">Corporate Finance Institute</a>
                </li>
                <li>
                  <a href="https://en.m.wikipedia.org/wiki/Environmental,_social,_and_corporate_governance" target="_blank" rel="noopener noreferrer">Wikipedia</a>
                </li>
                </ul>
                <h3>Image Sources</h3>
              <ul>
              <li>
                  <a href="https://www.traliant.com/courses/introduction-to-esg-environmental-social-and-governance/" target="_blank" rel="noopener noreferrer">Introduction to ESG</a>
                </li>
                <li>
                  <a href="https://www.workiva.com/blog/esg-capitalism-evolution-esg-reporting" target="_blank" rel="noopener noreferrer">ESG Evolution</a>
                </li>
                <li>
                  <a href="https://www.azeusconvene.com/esg" target="_blank" rel="noopener noreferrer">Disclosure&Regulations</a>
                </li>
                <li>
                  <a href="https://www.proactiveinvestors.co.uk/companies/news/1006470/blackrock-boss-points-to-structural-problems-in-esg-reporting-amid-rise-in-attention-1006470.html" target="_blank" rel="noopener noreferrer">Educating Businesses with ESG</a>
                </li>
                <li>
                  <a href="https://yourstory.com/2023/08/technological-advances-esg-disclosures-alternative-investment" target="_blank" rel="noopener noreferrer">Alternatives of ESG</a>
                </li>
                </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthProvider(KnowledgeCentre);
