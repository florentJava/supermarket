-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 28 mai 2024 à 17:08
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `koss_bd`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `description` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `nom`, `description`) VALUES
(11, 'insecticides', ' Les insecticides sont utilisés pour tuer les insectes nuisibles qui peuvent s\'attaquer aux cultures et aux plantes ornementales. Ils peuvent agir par contact, ingestion ou inhalation.\r\n\r\n'),
(12, 'Fongicides', 'Les fongicides sont utilisés pour tuer les champignons nuisibles qui peuvent provoquer des maladies des plantes. Ils peuvent agir en empêchant la germination des spores fongiques, en perturbant la croissance des champignons ou en tuant les cellules fongiques.'),
(13, 'Herbicides', ' Les herbicides sont utilisés pour tuer les mauvaises herbes qui peuvent concurrencer les cultures pour l\'eau, les nutriments et la lumière. Ils peuvent agir en perturbant la photosynthèse, la croissance ou la reproduction des mauvaises herbes.'),
(14, 'Molluscicides', 'Les molluscicides sont utilisés pour tuer les mollusques nuisibles, tels que les escargots et les limaces, qui peuvent s\'attaquer aux cultures et aux plantes ornementales.'),
(15, 'Rodenticides', 'Les rodenticides sont utilisés pour tuer les rongeurs nuisibles, tels que les rats et les souris, qui peuvent s\'attaquer aux cultures et aux structures.');

-- --------------------------------------------------------

--
-- Structure de la table `categorie_produit`
--

CREATE TABLE `categorie_produit` (
  `id_produit` int(11) DEFAULT NULL,
  `id_categorie` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie_produit`
--

INSERT INTO `categorie_produit` (`id_produit`, `id_categorie`) VALUES
(55, 11),
(56, 11),
(57, 11),
(58, 11),
(60, 12),
(59, 11),
(61, 12),
(62, 12),
(63, 12),
(64, 12),
(65, 13),
(66, 13),
(67, 13),
(68, 13),
(69, 13),
(70, 14),
(71, 14),
(72, 14),
(73, 14),
(74, 14),
(75, 15),
(76, 15),
(77, 15),
(78, 15),
(79, 11),
(80, 11);

-- --------------------------------------------------------

--
-- Structure de la table `employe`
--

CREATE TABLE `employe` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `dateN` date DEFAULT NULL,
  `sexe` varchar(10) DEFAULT NULL,
  `phone` int(10) DEFAULT NULL,
  `role` varchar(15) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `mdp` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `employe`
--

INSERT INTO `employe` (`id`, `nom`, `prenom`, `dateN`, `sexe`, `phone`, `role`, `user_name`, `mdp`) VALUES
(1, 'toto', 'florent', '2024-02-01', 'masculin', 32, NULL, 'toto', 'florent'),
(4, 'zeukeng', 'florent', '2016-01-02', 'masculin', 32, NULL, 'zeukeng', 'florent'),
(5, 'GAKAM', 'Yannick', '2002-06-06', 'masculin', 695917582, NULL, 'GAKAM', 'Yannick');

-- --------------------------------------------------------

--
-- Structure de la table `employee_roles`
--

CREATE TABLE `employee_roles` (
  `id_employe` int(11) DEFAULT NULL,
  `id_role` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `employee_roles`
--

INSERT INTO `employee_roles` (`id_employe`, `id_role`) VALUES
(2, 1),
(2, 3),
(1, 1),
(1, 2),
(1, 3),
(4, 2),
(4, 3),
(3, 1),
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(10, 2),
(11, 2),
(12, 2),
(13, 3),
(14, 1),
(15, 2),
(16, 2),
(17, 2),
(5, 1),
(5, 2),
(5, 3);

-- --------------------------------------------------------

--
-- Structure de la table `facture`
--

CREATE TABLE `facture` (
  `id` int(11) NOT NULL,
  `dateF` date DEFAULT current_timestamp(),
  `heure` time DEFAULT current_timestamp(),
  `total` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `facture`
--

INSERT INTO `facture` (`id`, `dateF`, `heure`, `total`) VALUES
(177, '2024-04-19', '06:11:29', 28000),
(178, '2024-04-19', '06:11:55', 67000),
(179, '2024-04-19', '06:12:19', 140500),
(180, '2024-04-20', '06:19:02', 7500),
(181, '2024-04-20', '06:19:04', 7500),
(182, '2024-04-20', '06:19:10', 7500),
(183, '2024-04-20', '06:21:22', 4500),
(184, '2024-04-20', '06:22:25', 6000),
(185, '2024-04-20', '06:24:48', 6000),
(186, '2024-04-20', '08:22:04', 8000),
(187, '2024-04-20', '08:52:21', 21500),
(188, '2024-04-20', '08:52:22', 33000),
(189, '2024-04-29', '16:12:01', 17500);

-- --------------------------------------------------------

--
-- Structure de la table `facture_produit`
--

CREATE TABLE `facture_produit` (
  `id_produit` int(11) DEFAULT NULL,
  `id_facture` int(11) DEFAULT NULL,
  `qte` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `facture_produit`
--

INSERT INTO `facture_produit` (`id_produit`, `id_facture`, `qte`, `id`) VALUES
(58, 177, 3, 166),
(77, 177, 3, 167),
(55, 177, 2, 168),
(67, 178, 2, 169),
(62, 178, 2, 170),
(65, 178, 2, 171),
(67, 179, 5, 172),
(61, 179, 4, 173),
(65, 179, 4, 174),
(66, 180, 1, 175),
(58, 180, 1, 176),
(66, 181, 1, 177),
(58, 181, 1, 178),
(66, 182, 1, 179),
(58, 182, 1, 180),
(67, 183, 1, 181),
(58, 184, 1, 182),
(77, 184, 1, 183),
(58, 185, 1, 184),
(77, 185, 1, 185),
(72, 186, 1, 186),
(72, 186, 1, 187),
(66, 187, 3, 188),
(58, 187, 1, 189),
(72, 187, 1, 190),
(66, 188, 3, 191),
(58, 188, 3, 192),
(77, 188, 3, 193),
(66, 189, 3, 194),
(58, 189, 1, 195);

-- --------------------------------------------------------

--
-- Structure de la table `fournisseur`
--

CREATE TABLE `fournisseur` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `dateN` date DEFAULT NULL,
  `sexe` varchar(10) DEFAULT NULL,
  `phone` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `livraison`
--

CREATE TABLE `livraison` (
  `id_produit` int(11) DEFAULT NULL,
  `id_fournisseur` int(11) DEFAULT NULL,
  `qte` int(11) DEFAULT NULL,
  `dateL` date DEFAULT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `qte_stock` int(11) DEFAULT NULL,
  `qte_critique` int(11) DEFAULT NULL,
  `prix` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id`, `nom`, `description`, `qte_stock`, `qte_critique`, `prix`) VALUES
(55, 'Chlorpyrifos', ' Chlorpyrifos est un insecticide organophosphoré utilisé pour contrôler un large éventail d\'insectes nuisibles, notamment les vers blancs, les scarabées et les mouches des fruits.', 57, 10, 5000),
(56, 'Malathion', ' Malathion est un autre insecticide organophosphoré utilisé pour contrôler les pucerons, les cochenilles et les tétranyques. ', 0, 5, 4500),
(57, 'Bifenthrine', ' Bifenthrine est un insecticide pyréthroïde utilisé pour contrôler les coléoptères, les lépidoptères et les homoptères. ', 0, 5, 3500),
(58, 'Abamectine', ' Abamectine est un insecticide avermectine utilisé pour contrôler les nématodes, les acariens et certains insectes nuisibles. ', 37, 5, 2500),
(59, 'Spinosad', '  Spinosad est un insecticide bio insecticide utilisé pour contrôler les lépidoptères, les coléoptères et certains insectes nuisibles à mâcher.  ', 0, 7, 2500),
(60, 'Cuivre', 'Cuivre est un fongicide utilisé depuis des siècles pour contrôler un large éventail de maladies fongiques. ', 0, 5, 5000),
(61, 'Soufre', ' Soufre est un autre fongicide couramment utilisé pour contrôler l\'oïdium, la tache tavelée et d\'autres maladies fongiques. ', 99, 5, 4500),
(62, 'Myclobutanil', 'Myclobutanil est un fongicide systémique utilisé pour contrôler les maladies fongiques foliaires, telles que la septoriose du blé et l\'oïdium de la vigne', 55, 5, 4000),
(63, 'Pyraclostrobine', 'Pyraclostrobine est un fongicide strobilurine utilisé pour contrôler un large éventail de maladies fongiques, notamment l\'oïdium, la tache tavelée et la rouille. \n', 0, 8, 3500),
(64, 'Azoxystrobine', 'Azoxystrobine est un autre fongicide strobilurine utilisé pour contrôler les maladies fongiques des céréales, du soja et d\'autres cultures. ', 0, 8, 3000),
(65, 'Glyphosate', 'Glyphosate est un herbicide non sélectif utilisé pour tuer un large éventail de mauvaises herbes et de plantes ligneuses. ', 69, 9, 25000),
(66, '2,4-D', '2,4-D est un herbicide auxinique utilisé pour contrôler les mauvaises herbes à feuilles larges, telles que le pissenlit et le trèfle. ', 100, 10, 5000),
(67, 'Paraquat', 'Paraquat est un herbicide non sélectif utilisé pour tuer les mauvaises herbes et les plantes ligneuses par contact. ', 95, 10, 4500),
(68, 'Diquat', 'Diquat est un autre herbicide non sélectif utilisé pour tuer les mauvaises herbes par contact. ', 0, 10, 4000),
(69, 'Metsulfuron-méthyl', 'Metsulfuron-méthyl est un herbicide sulfonylurée utilisé pour contrôler les mauvaises herbes à feuilles larges et les graminées dans les céréales', 0, 10, 4000),
(70, 'Métaldéhyde', 'Métaldéhyde est un molluscicide appât qui attire et tue les escargots et les limaces. Il agit en sécrétant une aldéhyde qui est toxique pour les mollusques. ', 0, 10, 4000),
(71, 'Phosphate de fer', 'Phosphate de fer est un autre molluscicide appât qui attire et tue les escargots et les limaces. Il agit en provoquant des hémorragies internes chez les mollusques. ', 0, 10, 4000),
(72, 'Bifenthrine', ' Bifenthrine est un insecticide pyréthroïde qui peut également être utilisé pour contrôler les limaces. Il agit en affectant le système nerveux des mollusques et en perturbant leur fonction musculaire. ', 55, 10, 4000),
(73, 'Méthiocarbamol', 'Méthiocarbamol est un carbamate qui peut être utilisé pour contrôler les limaces et les escargots. Il agit en inhibant une enzyme essentielle au fonctionnement du système nerveux des mollusques.', 0, 10, 4000),
(74, 'Chlorexate de cuivre', 'Chlorexate de cuivre est un composé de cuivre utilisé pour contrôler les limaces et les escargots. Il agit en perturbant la membrane cellulaire des mollusques et en provoquant leur déshydratation.', 0, 10, 4000),
(75, 'Warfarine', 'Warfarine est un anticoagulant qui provoque des hémorragies internes chez les rongeurs. ', 20, 10, 4000),
(76, 'Chlorophacinone', 'Chlorophacinone est un anticoagulant qui agit plus rapidement que la warfarine et le bromadiolone. ', 0, 10, 3500),
(77, 'Alpha-chloralose ', 'Alpha-chloralose est un somnifère qui endort les rongeurs, qui meurent ensuite d\'hypothermie ou de suffocation. ', 32, 10, 3500),
(78, 'Bromadiolone', 'Bromadiolone est un autre anticoagulant utilisé pour contrôler les rats et les souris. \n', 0, 4, 2000),
(79, 'engrais', 'cewdewdw', 0, 8, 1500),
(80, 'engrais', 'produit d\'erechissement du sol', 0, 8, 1500);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `nom` varchar(10) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `nom`, `description`) VALUES
(1, 'secretaire', 'description role secretaire'),
(2, 'maganisier', 'description role magasinier'),
(3, 'admin', 'description role admin');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `employe`
--
ALTER TABLE `employe`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `facture`
--
ALTER TABLE `facture`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `facture_produit`
--
ALTER TABLE `facture_produit`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `fournisseur`
--
ALTER TABLE `fournisseur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `livraison`
--
ALTER TABLE `livraison`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `employe`
--
ALTER TABLE `employe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `facture`
--
ALTER TABLE `facture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=190;

--
-- AUTO_INCREMENT pour la table `facture_produit`
--
ALTER TABLE `facture_produit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=196;

--
-- AUTO_INCREMENT pour la table `fournisseur`
--
ALTER TABLE `fournisseur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `livraison`
--
ALTER TABLE `livraison`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
