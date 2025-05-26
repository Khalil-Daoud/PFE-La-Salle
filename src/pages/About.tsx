import React from 'react';
import { Shield, Users, Truck, Award, Clock, CreditCard } from 'lucide-react';
import { Helmet } from 'react-helmet';

const About = () => {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Achats sécurisés",
      description: "Vos données sont protégées par un cryptage de pointe et des protocoles de sécurité rigoureux."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Support client",
      description: "Notre équipe dédiée est disponible 24h/24 et 7j/7 pour répondre à toutes vos questions."
    },
    {
      icon: <Truck className="h-10 w-10 text-primary" />,
      title: "Livraison rapide",
      description: "Profitez d’une expédition rapide et de solutions de livraison fiables partout dans le monde."
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Produits de qualité",
      description: "Nous sélectionnons uniquement les meilleurs produits technologiques selon des critères exigeants."
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Retour sous 30 jours",
      description: "Pas satisfait ? Retournez votre achat sous 30 jours pour un remboursement intégral."
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Paiement flexible",
      description: "Choisissez parmi plusieurs méthodes de paiement sécurisées pour plus de commodité."
    }
  ];

  return (
    <>
    <div className='mt-[70px]'>
      <Helmet>
        <title>À propos | Ooredoo El Hamma</title>
      </Helmet>

      <div className="pt-28 pb-16">
        {/* Section d’introduction */}
        <div className="container mx-auto px-6 mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">À propos de Ooredoo El Hamma</h1>
            <p className="text-lg text-muted-foreground">
              Révolutionnant l'expérience d'achat technologique depuis 2015. Nous sommes passionnés par la technologie et engagés à offrir un service exceptionnel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Notre mission</h2>
              <p className="text-muted-foreground mb-6">
                Chez Ooredoo El Hamma, notre mission est de rendre la technologie haut de gamme accessible à tous. L'innovation doit améliorer la vie quotidienne, et nous sélectionnons des produits qui y contribuent.
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Notre vision</h2>
              <p className="text-muted-foreground">
                Nous imaginons un monde où la technologie s’intègre parfaitement à la vie de tous les jours. Ooredoo El Hamma s'engage à être un acteur clé de cette révolution, en offrant bien plus que des produits : des solutions.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1000&q=80"
                alt="Notre équipe en action"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section des avantages */}
        <div className="bg-secondary py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir Ooredoo El Hamma ?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section équipe */}
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Rencontrez notre équipe dirigeante</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Zouinkhi Majdi",
                role: "PDG & Fondateur",
                image: "https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/492001663_1972917696448366_7925295225569862959_n.jpg"
              },
              {
                name: "Feriani Wael",
                role: "Directeur Technique",
                image: "../img/CEEO.jpg"
              },
              {
                name: "Ali",
                role: "Responsable Produit",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 mx-auto w-40 h-40 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Historique */}
        <div className="bg-secondary py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Notre parcours</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {[
                { year: "2015", title: "Fondation à El Hamma", description: "Ooredoo El Hamma est né avec une vision de transformation du commerce technologique." },
                { year: "2017", title: "Diversification des produits", description: "Ajout de l’audio haut de gamme et des technologies portables." },
                { year: "2019", title: "Expansion internationale", description: "Ouverture des bureaux en Europe et en Asie." },
                { year: "2021", title: "Initiative écologique", description: "Lancement d’emballages éco-responsables et de livraisons neutres en carbone." },
                { year: "2023", title: "Laboratoire d’innovation", description: "Création d’un centre R&D pour développer des produits technologiques exclusifs." }
              ].map((milestone, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-24 font-bold text-primary">{milestone.year}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default About;
