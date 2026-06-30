// NepaliDatePickerView.swift — UIKit Nepali BS date picker
// NepaliDatePicker Swift Package

import UIKit
import Foundation

// MARK: - NepaliDatePickerTheme

/// Built-in color themes for `NepaliDatePickerView`.
public enum NepaliDatePickerTheme {
    case defaultTheme
    case dark
    case nepali
    case green

    // MARK: Colors

    public var primaryColor: UIColor {
        switch self {
        case .defaultTheme: return UIColor(red: 0.082, green: 0.396, blue: 0.753, alpha: 1) // #1565C0
        case .dark:         return UIColor(red: 0.565, green: 0.792, blue: 0.976, alpha: 1) // #90CAF9
        case .nepali:       return UIColor(red: 0.824, green: 0.184, blue: 0.184, alpha: 1) // #D32F2F
        case .green:        return UIColor(red: 0.180, green: 0.490, blue: 0.196, alpha: 1) // #2E7D32
        }
    }

    public var backgroundColor: UIColor {
        switch self {
        case .defaultTheme: return UIColor.white
        case .dark:         return UIColor(red: 0.071, green: 0.071, blue: 0.071, alpha: 1)
        case .nepali:       return UIColor(red: 1.0, green: 0.973, blue: 0.973, alpha: 1)
        case .green:        return UIColor(red: 0.945, green: 0.973, blue: 0.914, alpha: 1)
        }
    }

    public var surfaceColor: UIColor {
        switch self {
        case .defaultTheme: return UIColor(red: 0.961, green: 0.961, blue: 0.961, alpha: 1)
        case .dark:         return UIColor(red: 0.118, green: 0.118, blue: 0.118, alpha: 1)
        case .nepali:       return UIColor(red: 1.0, green: 0.922, blue: 0.933, alpha: 1)
        case .green:        return UIColor(red: 0.863, green: 0.929, blue: 0.784, alpha: 1)
        }
    }

    public var onPrimaryColor: UIColor {
        switch self {
        case .defaultTheme: return UIColor.white
        case .dark:         return UIColor.black
        case .nepali:       return UIColor.white
        case .green:        return UIColor.white
        }
    }

    public var textColor: UIColor {
        switch self {
        case .defaultTheme: return UIColor(red: 0.129, green: 0.129, blue: 0.129, alpha: 1)
        case .dark:         return UIColor(red: 0.933, green: 0.933, blue: 0.933, alpha: 1)
        case .nepali:       return UIColor(red: 0.102, green: 0.102, blue: 0.102, alpha: 1)
        case .green:        return UIColor(red: 0.106, green: 0.106, blue: 0.106, alpha: 1)
        }
    }

    public var subtleTextColor: UIColor {
        switch self {
        case .defaultTheme: return UIColor(red: 0.620, green: 0.620, blue: 0.620, alpha: 1)
        case .dark:         return UIColor(red: 0.459, green: 0.459, blue: 0.459, alpha: 1)
        case .nepali:       return UIColor(red: 0.741, green: 0.741, blue: 0.741, alpha: 1)
        case .green:        return UIColor(red: 0.682, green: 0.835, blue: 0.506, alpha: 1)
        }
    }

    public var todayColor: UIColor {
        switch self {
        case .defaultTheme: return UIColor(red: 0.259, green: 0.647, blue: 0.961, alpha: 1)
        case .dark:         return UIColor(red: 0.392, green: 0.710, blue: 0.965, alpha: 1)
        case .nepali:       return UIColor(red: 0.937, green: 0.325, blue: 0.314, alpha: 1)
        case .green:        return UIColor(red: 0.400, green: 0.733, blue: 0.416, alpha: 1)
        }
    }

    public var rangeColor: UIColor {
        switch self {
        case .defaultTheme: return UIColor(red: 0.733, green: 0.871, blue: 0.984, alpha: 1)
        case .dark:         return UIColor(red: 0.102, green: 0.227, blue: 0.361, alpha: 1)
        case .nepali:       return UIColor(red: 1.0, green: 0.804, blue: 0.808, alpha: 1)
        case .green:        return UIColor(red: 0.788, green: 0.902, blue: 0.788, alpha: 1)
        }
    }
}

// MARK: - NepaliDatePickerDelegate

/// Delegate protocol for receiving date selection events.
public protocol NepaliDatePickerDelegate: AnyObject {
    /// Called when the user taps a date cell.
    func datePicker(_ picker: NepaliDatePickerView, didSelect date: BSDate)
}

// MARK: - NepaliDatePickerView

/// A UIKit view that renders a Bikram Sambat month calendar grid.
public class NepaliDatePickerView: UIView, UICollectionViewDataSource, UICollectionViewDelegate {

    // MARK: Public Properties

    public weak var delegate: NepaliDatePickerDelegate?

    public var selectedDate: BSDate? {
        didSet { reload() }
    }

    public var displayYear: Int {
        didSet { reload() }
    }

    public var displayMonth: Int {
        didSet { reload() }
    }

    public var firstDate: BSDate? {
        didSet { reload() }
    }

    public var lastDate: BSDate? {
        didSet { reload() }
    }

    public var theme: NepaliDatePickerTheme {
        didSet { applyTheme(); reload() }
    }

    public var lang: String {
        didSet { reload() }
    }

    // MARK: Private UI

    private var collectionView: UICollectionView!
    private var headerLabel: UILabel!
    private var prevButton: UIButton!
    private var nextButton: UIButton!
    private var weekdayStackView: UIStackView!

    // MARK: Init

    public init(theme: NepaliDatePickerTheme = .defaultTheme, lang: String = "ne") {
        let today = BSCalendarEngine.today()
        self.displayYear = today.year
        self.displayMonth = today.month
        self.theme = theme
        self.lang = lang
        super.init(frame: .zero)
        setupUI()
    }

    required init?(coder: NSCoder) {
        let today = BSCalendarEngine.today()
        self.displayYear = today.year
        self.displayMonth = today.month
        self.theme = .defaultTheme
        self.lang = "ne"
        super.init(coder: coder)
        setupUI()
    }

    // MARK: Setup

    private func setupUI() {
        backgroundColor = theme.backgroundColor

        // Header
        let headerStack = UIStackView()
        headerStack.axis = .horizontal
        headerStack.alignment = .center
        headerStack.distribution = .fill
        headerStack.translatesAutoresizingMaskIntoConstraints = false

        prevButton = UIButton(type: .system)
        prevButton.setImage(UIImage(systemName: "chevron.left"), for: .normal)
        prevButton.tintColor = theme.textColor
        prevButton.addTarget(self, action: #selector(prevMonth), for: .touchUpInside)
        prevButton.widthAnchor.constraint(equalToConstant: 44).isActive = true

        nextButton = UIButton(type: .system)
        nextButton.setImage(UIImage(systemName: "chevron.right"), for: .normal)
        nextButton.tintColor = theme.textColor
        nextButton.addTarget(self, action: #selector(nextMonth), for: .touchUpInside)
        nextButton.widthAnchor.constraint(equalToConstant: 44).isActive = true

        headerLabel = UILabel()
        headerLabel.textAlignment = .center
        headerLabel.font = UIFont.systemFont(ofSize: 16, weight: .bold)
        headerLabel.textColor = theme.textColor
        headerLabel.isUserInteractionEnabled = true
        let tap = UITapGestureRecognizer(target: self, action: #selector(headerTapped))
        headerLabel.addGestureRecognizer(tap)

        headerStack.addArrangedSubview(prevButton)
        headerStack.addArrangedSubview(headerLabel)
        headerStack.addArrangedSubview(nextButton)

        addSubview(headerStack)
        NSLayoutConstraint.activate([
            headerStack.topAnchor.constraint(equalTo: topAnchor, constant: 8),
            headerStack.leadingAnchor.constraint(equalTo: leadingAnchor),
            headerStack.trailingAnchor.constraint(equalTo: trailingAnchor),
            headerStack.heightAnchor.constraint(equalToConstant: 44),
        ])

        // Weekday row
        weekdayStackView = UIStackView()
        weekdayStackView.axis = .horizontal
        weekdayStackView.distribution = .fillEqually
        weekdayStackView.translatesAutoresizingMaskIntoConstraints = false
        addSubview(weekdayStackView)
        NSLayoutConstraint.activate([
            weekdayStackView.topAnchor.constraint(equalTo: headerStack.bottomAnchor, constant: 4),
            weekdayStackView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 8),
            weekdayStackView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -8),
            weekdayStackView.heightAnchor.constraint(equalToConstant: 28),
        ])
        buildWeekdayLabels()

        // Collection view
        let layout = UICollectionViewFlowLayout()
        layout.minimumInteritemSpacing = 0
        layout.minimumLineSpacing = 0
        collectionView = UICollectionView(frame: .zero, collectionViewLayout: layout)
        collectionView.translatesAutoresizingMaskIntoConstraints = false
        collectionView.backgroundColor = theme.backgroundColor
        collectionView.dataSource = self
        collectionView.delegate = self
        collectionView.register(NepaliDayCell.self, forCellWithReuseIdentifier: "NepaliDayCell")
        collectionView.isScrollEnabled = false
        addSubview(collectionView)
        NSLayoutConstraint.activate([
            collectionView.topAnchor.constraint(equalTo: weekdayStackView.bottomAnchor, constant: 4),
            collectionView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 8),
            collectionView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -8),
            collectionView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -8),
        ])

        reload()
    }

    private func buildWeekdayLabels() {
        weekdayStackView.arrangedSubviews.forEach { $0.removeFromSuperview() }
        let names = lang == "ne" ? weekdaysNe : weekdaysEn
        for name in names {
            let label = UILabel()
            label.text = name
            label.textAlignment = .center
            label.font = UIFont.systemFont(ofSize: 11, weight: .semibold)
            label.textColor = theme.subtleTextColor
            weekdayStackView.addArrangedSubview(label)
        }
    }

    private func applyTheme() {
        backgroundColor = theme.backgroundColor
        collectionView?.backgroundColor = theme.backgroundColor
        headerLabel?.textColor = theme.textColor
        prevButton?.tintColor = theme.textColor
        nextButton?.tintColor = theme.textColor
        buildWeekdayLabels()
    }

    // MARK: Public

    public func reload() {
        let monthNames = lang == "ne" ? bsMonthNamesNe : bsMonthNamesEn
        headerLabel?.text = "\(monthNames[displayMonth - 1]) \(displayYear)"
        collectionView?.reloadData()
    }

    // MARK: Actions

    @objc private func prevMonth() {
        if displayMonth == 1 {
            displayMonth = 12
            displayYear -= 1
        } else {
            displayMonth -= 1
        }
    }

    @objc private func nextMonth() {
        if displayMonth == 12 {
            displayMonth = 1
            displayYear += 1
        } else {
            displayMonth += 1
        }
    }

    @objc private func headerTapped() {
        guard let vc = findViewController() else { return }

        let alert = UIAlertController(
            title: lang == "ne" ? "वर्ष र महिना" : "Year & Month",
            message: nil,
            preferredStyle: .actionSheet
        )

        // Add year options (current year ± 10)
        let startYear = max(1970, displayYear - 10)
        let endYear = min(2090, displayYear + 10)
        for y in startYear...endYear {
            alert.addAction(UIAlertAction(title: "\(y)", style: .default) { [weak self] _ in
                guard let self = self else { return }
                self.displayYear = y
            })
        }
        alert.addAction(UIAlertAction(title: lang == "ne" ? "रद्द" : "Cancel", style: .cancel))

        if let popover = alert.popoverPresentationController {
            popover.sourceView = headerLabel
            popover.sourceRect = headerLabel.bounds
        }
        vc.present(alert, animated: true)
    }

    private func findViewController() -> UIViewController? {
        var responder: UIResponder? = self
        while let r = responder {
            if let vc = r as? UIViewController { return vc }
            responder = r.next
        }
        return nil
    }

    // MARK: UICollectionViewDataSource

    public func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 42
    }

    public func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "NepaliDayCell", for: indexPath) as! NepaliDayCell

        let firstWeekday = (try? BSCalendarEngine.firstDayOfWeek(year: displayYear, month: displayMonth)) ?? 0
        let daysInMonth = BSCalendarEngine.daysInMonth(year: displayYear, month: displayMonth)
        let today = BSCalendarEngine.today()

        let dayNumber = indexPath.item - firstWeekday + 1
        if dayNumber < 1 || dayNumber > daysInMonth {
            cell.configure(day: nil, isCurrentMonth: false, isSelected: false, isToday: false, isDisabled: false, theme: theme)
            return cell
        }

        let date = BSDate(year: displayYear, month: displayMonth, day: dayNumber)
        let isSelected = selectedDate == date
        let isToday = today.year == displayYear && today.month == displayMonth && today.day == dayNumber
        var isDisabled = false
        if let first = firstDate, date < first { isDisabled = true }
        if let last = lastDate, date > last { isDisabled = true }

        cell.configure(day: dayNumber, isCurrentMonth: true, isSelected: isSelected, isToday: isToday, isDisabled: isDisabled, theme: theme)
        return cell
    }

    // MARK: UICollectionViewDelegate

    public func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let firstWeekday = (try? BSCalendarEngine.firstDayOfWeek(year: displayYear, month: displayMonth)) ?? 0
        let daysInMonth = BSCalendarEngine.daysInMonth(year: displayYear, month: displayMonth)
        let dayNumber = indexPath.item - firstWeekday + 1
        guard dayNumber >= 1, dayNumber <= daysInMonth else { return }

        let date = BSDate(year: displayYear, month: displayMonth, day: dayNumber)
        if let first = firstDate, date < first { return }
        if let last = lastDate, date > last { return }

        selectedDate = date
        delegate?.datePicker(self, didSelect: date)
    }
}

// MARK: - UICollectionViewDelegateFlowLayout

extension NepaliDatePickerView: UICollectionViewDelegateFlowLayout {
    public func collectionView(
        _ collectionView: UICollectionView,
        layout collectionViewLayout: UICollectionViewLayout,
        sizeForItemAt indexPath: IndexPath
    ) -> CGSize {
        let width = (collectionView.bounds.width) / 7
        return CGSize(width: width, height: width)
    }
}

// MARK: - NepaliDayCell

/// A single day cell used by `NepaliDatePickerView`.
public class NepaliDayCell: UICollectionViewCell {

    private let dayLabel: UILabel = {
        let label = UILabel()
        label.textAlignment = .center
        label.font = UIFont.systemFont(ofSize: 14, weight: .regular)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    override init(frame: CGRect) {
        super.init(frame: frame)
        contentView.addSubview(dayLabel)
        NSLayoutConstraint.activate([
            dayLabel.centerXAnchor.constraint(equalTo: contentView.centerXAnchor),
            dayLabel.centerYAnchor.constraint(equalTo: contentView.centerYAnchor),
            dayLabel.widthAnchor.constraint(equalTo: contentView.widthAnchor, multiplier: 0.85),
            dayLabel.heightAnchor.constraint(equalTo: contentView.heightAnchor, multiplier: 0.85),
        ])
        contentView.layer.masksToBounds = true
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    public func configure(
        day: Int?,
        isCurrentMonth: Bool,
        isSelected: Bool,
        isToday: Bool,
        isDisabled: Bool,
        theme: NepaliDatePickerTheme
    ) {
        guard let day = day, isCurrentMonth else {
            dayLabel.text = nil
            contentView.backgroundColor = .clear
            contentView.layer.borderWidth = 0
            contentView.layer.cornerRadius = 0
            return
        }

        dayLabel.text = "\(day)"

        let size = min(contentView.bounds.width, contentView.bounds.height) * 0.85
        let radius = size / 2
        contentView.layer.cornerRadius = radius

        if isSelected {
            contentView.backgroundColor = theme.primaryColor
            dayLabel.textColor = theme.onPrimaryColor
            dayLabel.font = UIFont.systemFont(ofSize: 14, weight: .bold)
            contentView.layer.borderWidth = 0
        } else if isToday {
            contentView.backgroundColor = theme.todayColor.withAlphaComponent(0.2)
            dayLabel.textColor = theme.todayColor
            dayLabel.font = UIFont.systemFont(ofSize: 14, weight: .bold)
            contentView.layer.borderColor = theme.todayColor.cgColor
            contentView.layer.borderWidth = 1.5
        } else {
            contentView.backgroundColor = .clear
            dayLabel.textColor = isDisabled ? theme.subtleTextColor.withAlphaComponent(0.4) : theme.textColor
            dayLabel.font = UIFont.systemFont(ofSize: 14, weight: .regular)
            contentView.layer.borderWidth = 0
        }

        isUserInteractionEnabled = !isDisabled
    }

    public override func prepareForReuse() {
        super.prepareForReuse()
        dayLabel.text = nil
        contentView.backgroundColor = .clear
        contentView.layer.borderWidth = 0
    }
}
